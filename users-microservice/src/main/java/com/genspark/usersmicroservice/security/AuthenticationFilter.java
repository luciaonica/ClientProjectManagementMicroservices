package com.genspark.usersmicroservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.usersmicroservice.service.UserService;
import com.genspark.usersmicroservice.shared.UserDto;
import com.genspark.usersmicroservice.ui.model.LoginRequestModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final Environment environment;
    private final UserService usersService;

    public AuthenticationFilter(Environment environment, AuthenticationManager authenticationManager,
                                UserService usersService) {
        this.environment = environment;
        this.usersService = usersService;
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException {
        try {

            LoginRequestModel creds = new ObjectMapper().readValue(req.getInputStream(), LoginRequestModel.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(), new ArrayList<>()));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        // Get User Details from Database
        String userName = ((UserPrincipal) auth.getPrincipal()).getUsername();
        UserDto userDto = usersService.getUserByEmail(userName);

        // Generate JWT
        Claims claims = Jwts.claims();
        claims.put("userName", userDto.getEmail());

        String token = Jwts.builder()
                // .setClaims(claims)
                .setSubject(userDto.getUserId())
                .setExpiration(new Date(
                        System.currentTimeMillis() + Long.parseLong(environment.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, environment.getProperty("token.secret")).compact();

        res.addHeader("Token", token);
        res.addHeader("UserID", userDto.getUserId());

    }

}
