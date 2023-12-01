package com.genspark.usersmicroservice.security;

import com.genspark.usersmicroservice.data.UserEntity;
import com.genspark.usersmicroservice.data.UserRepository;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class AuthorizationFilter extends BasicAuthenticationFilter {

    Environment environment;
    private final UserRepository userRepository;

    public AuthorizationFilter(AuthenticationManager authManager, Environment environment, UserRepository userRepository) {
        super(authManager);
        this.environment = environment;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {

        String authorizationHeader = req.getHeader(environment.getProperty("authorization.token.header.name"));

        if (authorizationHeader == null || !authorizationHeader.startsWith(environment.getProperty("authorization.token.header.prefix"))) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {
        String token = req.getHeader(environment.getProperty("authorization.token.header.name"));

        if (token != null) {
            token = token.replace(environment.getProperty("authorization.token.header.prefix"), "");

            String user = Jwts.parser()
                    .setSigningKey(environment.getProperty("token.secret"))
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

            if (user != null) {
                System.out.println("user      " + user);
                UserEntity userEntity = userRepository.findByUserId(user);
                System.out.println("userEntity     " + userEntity.getUserId());
                UserPrincipal userPrincipal = new UserPrincipal(userEntity);
                System.out.println("User principal username      " + userPrincipal.getUsername());
                return new UsernamePasswordAuthenticationToken(user, null, userPrincipal.getAuthorities());
            }
            return null;
        }

        return null;

    }

}
