package com.tinytrace.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tinytrace.models.User;


public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username); 
    boolean existsByEmail(String email); 
}
