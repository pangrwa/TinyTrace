package com.tinytrace.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.repositories.UserRepository;

@RestController
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository; 
    }

    @PostMapping("/users")
    public String login() {
        // handle logic of login
        return "login success"; 
    }

    @PostMapping("/signup")
    public String signup() {
        //handle logic of signup
        return "signup success";
    }

}
