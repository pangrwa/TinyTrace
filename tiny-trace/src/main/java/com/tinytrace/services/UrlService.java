package com.tinytrace.services;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.tinytrace.models.Url;
import com.tinytrace.models.User;
import com.tinytrace.repositories.UrlRepository;
import com.tinytrace.dto.UrlRequest;
import com.tinytrace.exceptions.urls.UrlNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UrlService {

    private final UrlShorterningService urlShorterningService;
    private final UserService userService;
    private final AuthService authService;
    private final UrlRepository urlRepository;

    public Url findById(String id) {
        return urlRepository.findById(id).orElseThrow(() -> new UrlNotFoundException(id));
    }

    public Url findByShortUrlId(String shortUrlId) {
        return urlRepository.findByShortUrlId(shortUrlId).orElseThrow(
                () -> new UrlNotFoundException(shortUrlId));
    }
    
    public Stream<Url> findByUser() {
        String authUsername = authService.getUserDetails().getUsername();
        String authUserId = userService.findByUsername(authUsername).getId();

        return StreamSupport.stream(
                urlRepository.findByUserId(authUserId).spliterator(), false
        );
    }

    public Stream<Url> findByUserId(String userId) {
        String authUsername = authService.getUserDetails().getUsername();
        String authUserId = userService.findByUsername(authUsername).getId();
        
        // shouldn't happen because the jwtService should have should have caught this in filters
        if (!authUserId.equals(userId)) { 
            // create custom exception?
            // maybe add an assert instead 
            throw new IllegalArgumentException("User not authorized to view this resource.");
        }
        return StreamSupport.stream(
                urlRepository.findByUserId(userId).spliterator(), false);
    }

    public Stream<Url> findAll() {
        return StreamSupport.stream(
                urlRepository.findAll().spliterator(), false);
    }

    public Url createUrl(UrlRequest urlRequest) {
        String shortUrlId = urlShorterningService.getShortUrl();
        String username = authService.getUserDetails().getUsername();
        User user = userService.findByUsername(username);
        Url newUrl = new Url(
                shortUrlId,
                urlRequest.longUrl(),
                user.getId());
        return urlRepository.save(newUrl);
    }

    public boolean existsByShortUrlId(String shortUrlId) {
        return urlRepository.existsByShortUrlId(shortUrlId);
    }
}
