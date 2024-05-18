package com.tinytrace.controllers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.UserModelAssembler;
import com.tinytrace.dto.LoginRequest;
import com.tinytrace.dto.SignupRequest;
import com.tinytrace.models.User;
import com.tinytrace.services.AuthService;

@RestController
public class AuthController {
    private final AuthService authService;
    private final UserModelAssembler userModelAssembler;

    public AuthController(AuthService authService, UserModelAssembler userModelAssembler) {
        this.authService = authService;
        this.userModelAssembler = userModelAssembler;
    }

    @PostMapping("/login") 
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = authService.handleLogin(loginRequest);
        EntityModel<User> userEntityModel = userModelAssembler.toModel(user);
        return ResponseEntity.created(userEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(userEntityModel);
    }    

    @PostMapping("/signup") 
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        User user = authService.handleSignup(signupRequest);
        EntityModel<User> userEntityModel = userModelAssembler.toModel(user);
        return ResponseEntity.created(userEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()).body(userEntityModel);
    }
}
