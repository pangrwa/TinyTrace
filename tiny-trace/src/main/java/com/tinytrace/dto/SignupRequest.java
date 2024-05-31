package com.tinytrace.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @Email(message = "Invalid email format.")
    String email, 
    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters.")
    String username, 
    // todo: add password constraint in the future
    String password
) {}
