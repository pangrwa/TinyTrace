package com.tinytrace.models;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
// tells hibernate to treat user as a string rather than a reserved keyword
@Table(name = "\"user\"") 
public class User {
    
    private @Id @GeneratedValue Long id;
    private String email; 
    private String username; 
    // store as un-hashed first
    private String password;

    private User() {}

    public User(String email, String username, String password) {
        this.email = email; 
        this.username = username; 
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
            Objects.equals(username, user.username) && 
            Objects.equals(password, user.password);
    }

    @Override
    public String toString() {
        return String.format(
            "User{id=%d, email=%s, userName=%s, password=%s}", id, email, username, password
        );
    } 

}
