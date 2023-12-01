package com.genspark.usersmicroservice.service;

import com.genspark.usersmicroservice.data.Role;
import com.genspark.usersmicroservice.data.UserEntity;
import com.genspark.usersmicroservice.data.UserRepository;
import com.genspark.usersmicroservice.security.UserPrincipal;
import com.genspark.usersmicroservice.shared.JwtUtil;
import com.genspark.usersmicroservice.shared.UserDto;
import com.genspark.usersmicroservice.shared.UsersServiceException;
import com.genspark.usersmicroservice.ui.model.ProjectResponseModel;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.*;

@Service
public class UserServiceImpl implements UserService{

    BCryptPasswordEncoder bCryptPasswordEncoder;
    UserRepository userRepository;
    JwtUtil jwtUtil;
    RestTemplate restTemplate;
    Environment environment;
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder, UserRepository userRepository,
                            JwtUtil jwtUtil, RestTemplate restTemplate, Environment environment) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.restTemplate = restTemplate;
        this.environment = environment;
    }

    @Override
    public UserDto createUser(UserDto userDto) {

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);

        userEntity.setUserId(UUID.randomUUID().toString());
        userEntity.setRole(Role.ADMIN);
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

        userRepository.save(userEntity);

        return modelMapper.map(userEntity, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
        }

        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null) {
            throw new UsernameNotFoundException(email);
        }

        return new UserPrincipal(userEntity);

//        Collection<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(userEntity.getRole()));
//
//
//        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), true, // Email verification status
//                true, true, true, authorities);
    }

    @Override
    public void deleteUser(String userId, String authorizationHeader) {

        String userIdFromHeader = jwtUtil.getUserId(authorizationHeader);

        if (!userId.equalsIgnoreCase(userIdFromHeader)) {
            throw new UsersServiceException("Operation not allowed");
        }

        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null)
            throw new UsersServiceException("User not found");

        userRepository.delete(userEntity);

    }

    @Override
    public UserDto getUserByUserId(String userId) throws UsersServiceException {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null)
            throw new UsersServiceException(environment.getProperty("users.exceptions.user-not-found"));

        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public List<UserDto> getUsers() {
        List<UserEntity> userEntities = (List<UserEntity>) userRepository.findAll();

        if (userEntities == null || userEntities.isEmpty())
            return new ArrayList<>();

        Type listType = new TypeToken<List<UserDto>>() {
        }.getType();

        List<UserDto> returnValue = new ModelMapper().map(userEntities, listType);

        return returnValue;
    }

    @Override
    public List<ProjectResponseModel> getUserProjects(String jwt) {

        String projectsUrl = environment.getProperty("projects.url");
        logger.info("projectsUrl = " + projectsUrl);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        ResponseEntity<List<ProjectResponseModel>> projectsListResponse = restTemplate.exchange(projectsUrl, HttpMethod.GET,
                new HttpEntity<>(httpHeaders), new ParameterizedTypeReference<List<ProjectResponseModel>>() {
                });

        logger.info(
                "Projects web service endpoint called and received " + projectsListResponse.getBody().size() + " items");

        return projectsListResponse.getBody();
    }
}
