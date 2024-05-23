package com.tinytrace.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.configs.SecurityUser;
import com.tinytrace.dto.AuthenticationResponse;
import com.tinytrace.dto.LoginRequest;
import com.tinytrace.dto.SignupRequest;
import com.tinytrace.models.User;
import com.tinytrace.services.AuthService;
import com.tinytrace.services.JwtService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/auth/login") 
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = authService.handleLogin(loginRequest);
        UserDetails userDetails = new SecurityUser(user);
        String jwt = jwtService.generateToken(userDetails);
        AuthenticationResponse authResponse = new AuthenticationResponse(jwt);
        return ResponseEntity.ok(authResponse);
    }    

    @PostMapping("/auth/signup") 
    public ResponseEntity<AuthenticationResponse> signup(@RequestBody SignupRequest signupRequest) {
        User user = authService.handleSignup(signupRequest); 
        UserDetails userDetails = new SecurityUser(user);
        String jwt = jwtService.generateToken(userDetails);
        AuthenticationResponse authResponse = new AuthenticationResponse(jwt); 
        return ResponseEntity.ok(authResponse);
    }
}
