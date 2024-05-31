package com.tinytrace.exceptions;

import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.integration.IntegrationProperties.Error;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.tinytrace.exceptions.users.UserExistsException;
import com.tinytrace.exceptions.users.UserNotFoundException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import com.tinytrace.exceptions.urls.UrlNotFoundException;

@ControllerAdvice
public class GlobalExcetionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserExistsException(UserExistsException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.CONFLICT.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(UrlNotFoundException.class) 
    public ResponseEntity<ErrorResponse> handleUrlNotFoundException(UrlNotFoundException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }  

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), 
            e.getBindingResult().getAllErrors().stream().map(
                err -> err.getDefaultMessage()
            ).collect(Collectors.joining(" "))
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }  
}
