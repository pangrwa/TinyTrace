package com.tinytrace.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tinytrace.models.User;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username); 
}
