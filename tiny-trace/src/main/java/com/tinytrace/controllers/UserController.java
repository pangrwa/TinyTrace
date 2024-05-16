package com.tinytrace.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserRepository UserRepository;

    public UserController(UserRepository UserRepository) {
        this.UserRepository = UserRepository; 
    }

    @PostMapping("/login")
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
