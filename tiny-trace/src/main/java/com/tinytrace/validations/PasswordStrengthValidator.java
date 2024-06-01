package com.tinytrace.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordStrengthValidator implements ConstraintValidator<StrongPassword, String> {

    @Override
    public void initialize(StrongPassword constraintAnnotation) {

    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }
        String regexPattern = ("^(?=.*[0-9])" + // at least one digit
                "(?=.*[a-z])" + // at least one lowercase letter
                "(?=.*[A-Z])" + // at least one uppercase letter
                "(?=\\S+$)" + // no white spaces
                ".{8,}" // at least 8 characters
        );
        return password.matches(regexPattern); 
    }
}
