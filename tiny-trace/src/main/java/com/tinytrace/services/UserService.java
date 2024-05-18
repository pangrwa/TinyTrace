package com.tinytrace.services;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tinytrace.exceptions.users.UserNotFoundException;
import com.tinytrace.models.User;
import com.tinytrace.repositories.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    public Stream<User> findAll() {
        return StreamSupport.stream(userRepository
        .findAll().spliterator(), false); 
    }

    public User createUser(User user) {
        return userRepository.save(user); 
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}
