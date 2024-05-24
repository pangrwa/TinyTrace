package com.tinytrace.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.UserModelAssembler;
import com.tinytrace.models.User;
import com.tinytrace.services.UserService;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class UserController {
    private final UserModelAssembler userModelAssembler;
    private final UserService userService;

    public UserController(UserModelAssembler userModelAssembler, UserService userService) {
        this.userModelAssembler = userModelAssembler;
        this.userService = userService;
    }

    @GetMapping("/users/{id}")
    public EntityModel<User> getUserById(@PathVariable String id) {
        User user = userService.findById(id);
        return userModelAssembler.toModel(user);
    }

    @GetMapping("/users")
    public CollectionModel<EntityModel<User>> all() {
        List<EntityModel<User>> users = userService.findAll()
                .map(userModelAssembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(users, linkTo(
                methodOn(UserController.class).all()).withSelfRel());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
