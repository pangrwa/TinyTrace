package com.tinytrace.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class UrlValidator implements ConstraintValidator<UrlConstraint, String> {

    @Override
    public void initialize(UrlConstraint constraintAnnotation) {}

    @Override
    public boolean isValid(String url, ConstraintValidatorContext context) {
        if (url == null || url.isEmpty()) {
            return false; 
        }
        try {
            new URL(url);
            return true; 
        } catch (MalformedURLException e) {
            return false;
        //} catch (URISyntaxException e) {
        //    return false; 
        }
    }
}

