package com.genspark.usersmicroservice.service;

import com.genspark.usersmicroservice.shared.UserDto;
import com.genspark.usersmicroservice.ui.model.ProjectResponseModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    public List<UserDto> getUsers();
    public UserDto createUser(UserDto userDto);
    public UserDto getUserByEmail(String email);
    public UserDto getUserByUserId(String userId);
    public void deleteUser(String userId, String authorizationHeader);
    public List<ProjectResponseModel> getUserProjects(String jwt);
}
