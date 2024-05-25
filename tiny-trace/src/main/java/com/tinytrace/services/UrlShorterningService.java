package com.tinytrace.services;

import java.util.Base64;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class UrlShorterningService {
   
    public static final int SHORT_URL_LENGTH = 7; 
    public static final int BASE_64_LENGTH = 64;
    private static final String BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
   
    public String getShortUrl() {
        // random string for now just to test api 
        return createRandomString(); 
    }

    public String createRandomString() {
        Random random = new Random(); 
        StringBuilder sb = new StringBuilder(SHORT_URL_LENGTH); 
        for (int i = 0; i < SHORT_URL_LENGTH; ++i) {
            int randomValue = Math.abs(random.nextInt()); 
            int idx = randomValue % BASE_64_LENGTH; 
            sb.append(BASE64_CHARS.charAt(idx));
        }
        return sb.toString(); 
    }
}
