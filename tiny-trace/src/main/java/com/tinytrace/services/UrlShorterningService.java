package com.tinytrace.services;

import java.util.Base64;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.backoff.ExponentialBackOff;

import lombok.AllArgsConstructor;

@Service
public class UrlShorterningService {


    public static final int SHORT_URL_LENGTH = 7;
    // removed backslash temporarily to avoid confusion with the endpoint
    public static final int BASE_64_LENGTH = 63;
    public static final int MAX_RETRIES = 10;
    private static final String BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+";
    private UrlService urlService; 

    // prevent circular dependency by lazy loading
    @Autowired
    public void setUrlService(@Lazy UrlService urlService) {
        this.urlService = urlService;
    }
    
    public String getShortUrl() {
        // random string for now just to test api
        String shortUrl = createRandomString();
        int retryCount = 1;

        while (retryCount < MAX_RETRIES && urlService.existsByShortUrlId(shortUrl)) {
            shortUrl = createRandomString();
            retryCount++;
        }
        // todo: implement a backoff algorithm or even better ask the server for a
        // unique and available shortUrlId
        if (retryCount == MAX_RETRIES) {
            throw new RuntimeException("Failed to generate a unique short url, try again later");
        }
        return shortUrl;
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
