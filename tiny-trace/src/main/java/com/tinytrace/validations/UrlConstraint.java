package com.tinytrace.validations;

import java.lang.annotation.*;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target( { ElementType.FIELD, ElementType.METHOD } ) 
@Retention( RetentionPolicy.RUNTIME )
@Constraint(validatedBy = UrlValidator.class)
public @interface UrlConstraint {
    String message() default "Invalid URL";
    Class<?>[] groups() default {}; 
    Class<? extends Payload>[] payload() default {}; 
}
