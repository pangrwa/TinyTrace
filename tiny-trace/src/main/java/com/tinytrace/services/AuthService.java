package com.tinytrace.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tinytrace.dto.LoginRequest;
import com.tinytrace.dto.SignupRequest;
import com.tinytrace.models.User;

@Service
public class AuthService {
    private final UserService userService; 
    
    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public User handleLogin(LoginRequest loginRequest) {
        // todo: handle authentication with token in the future
        return userService.findByUsername(loginRequest.username());
    }

    public User handleSignup(SignupRequest signupRequest) {
        if (userService.existsByEmail(signupRequest.email())) {
            // todo: throw custom exception
            throw new IllegalArgumentException("Email already exists");
        }
        User user = new User(
            signupRequest.email(),
            signupRequest.username(),
            signupRequest.password()
        ); 

        return userService.createUser(user); 
    }
}
