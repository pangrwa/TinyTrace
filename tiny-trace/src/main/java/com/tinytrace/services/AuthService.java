package com.tinytrace.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tinytrace.dto.LoginRequest;
import com.tinytrace.dto.SignupRequest;
import com.tinytrace.exceptions.users.UserExistsException;
import com.tinytrace.models.User;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserService userService; 
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    
    public User handleLogin(LoginRequest loginRequest) {
        // check whether credentials are valid 
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.username(),
                loginRequest.password()
            )
        );
        return userService.findByUsername(loginRequest.username());
    }

    public User handleSignup(SignupRequest signupRequest) {
        if (userService.existsByEmail(signupRequest.email())) {
            throw new UserExistsException(signupRequest.email()); 
        }
        User user = new User(
            signupRequest.email(),
            signupRequest.username(),
            passwordEncoder.encode(signupRequest.password())
        ); 
        return userService.createUser(user); 
    }
}
