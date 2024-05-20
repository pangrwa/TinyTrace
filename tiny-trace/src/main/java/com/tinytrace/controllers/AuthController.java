package com.tinytrace.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.dto.LoginRequest;
import com.tinytrace.dto.SignupRequest;
import com.tinytrace.services.AuthService;

@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login") 
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        authService.handleLogin(loginRequest);
        return ResponseEntity.ok().build(); 
    }    

    @PostMapping("/auth/signup") 
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        authService.handleSignup(signupRequest); 
        return ResponseEntity.ok().build(); 
    }
}
