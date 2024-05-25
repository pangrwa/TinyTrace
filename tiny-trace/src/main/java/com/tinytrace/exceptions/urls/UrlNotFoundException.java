package com.tinytrace.exceptions.urls;

public class UrlNotFoundException extends RuntimeException {
    public UrlNotFoundException(String id) {
        super("Url with id: " + id  + " not found");
    }
    
}
