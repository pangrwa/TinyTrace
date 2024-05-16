package com.tinytrace.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User {
    
    @Id
    @GeneratedValue
    private Long id;
    private String email; 
    private String userName; 
    // store as un-hashed first
    private String password;

    private User() {}

    public User(String email, String userName, String password) {
        this.email = email; 
        this.userName = userName; 
        this.password = password; 
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true; 
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        User user = (User) o; 
        return Objects.equals(id, user.id) &&
            Objects.equals(email, user.email) &&
            Objects.equals(userName, user.userName) && 
            Objects.equals(password, user.password);
    }

    @Override
    public String toString() {
        return String.format(
            "User{id=%d, email=%s, userName=%s, password=%s}", id, email, userName, password
        );
    } 
}
