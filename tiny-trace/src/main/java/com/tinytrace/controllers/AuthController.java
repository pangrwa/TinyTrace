package com.tinytrace.controllers;

import org.springframework.hateoas.EntityModel;
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

import jakarta.validation.Valid;

import com.tinytrace.assembler.AuthModelAssembler;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final AuthModelAssembler authModelAssembler; 

    @PostMapping("/api/auth/login") 
    public ResponseEntity<EntityModel<AuthenticationResponse>> login(@RequestBody LoginRequest loginRequest) {
        User user = authService.handleLogin(loginRequest);
        UserDetails userDetails = new SecurityUser(user);
        String jwt = jwtService.generateToken(userDetails);
        AuthenticationResponse authResponse = new AuthenticationResponse(jwt);
        return ResponseEntity.ok().body(authModelAssembler.toModel(authResponse));
    }    

    @PostMapping("/api/auth/signup") 
    public ResponseEntity<EntityModel<AuthenticationResponse>> signup(@Valid @RequestBody SignupRequest signupRequest) {
        User user = authService.handleSignup(signupRequest); 
        UserDetails userDetails = new SecurityUser(user);
        String jwt = jwtService.generateToken(userDetails);
        AuthenticationResponse authResponse = new AuthenticationResponse(jwt); 
        return ResponseEntity.ok().body(authModelAssembler.toModel(authResponse));
    }
}
