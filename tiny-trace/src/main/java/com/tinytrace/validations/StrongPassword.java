package com.tinytrace.validations;

import java.lang.annotation.ElementType;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordStrengthValidator.class)
@Documented
public @interface StrongPassword {
    String message() default "Password is not strong enough. Pasword should contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, no white spaces and at least 8 characters long.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
