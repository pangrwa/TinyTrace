package com.tinytrace.services;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.tinytrace.models.Url;
import com.tinytrace.models.User;
import com.tinytrace.repositories.UrlRepository;
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

    public Url findByShortUrl(String shortUrl) {
        return urlRepository.findByShortUrl(shortUrl).orElseThrow(
            () -> new UrlNotFoundException(shortUrl)
        );
    }

    public Stream<Url> findByUserId() {
        String username = authService.getUserDetails().getUsername(); 
        String userId = userService.findByUsername(username).getId();
        return StreamSupport.stream(
            urlRepository.findByUserId(userId).spliterator(), false
        );
    }

    public Stream<Url> findAll() {
        return StreamSupport.stream(
            urlRepository.findAll().spliterator(), false
        ); 
    }

    public Url createUrl(Url url) {
        String shortUrl = urlShorterningService.getShortUrl();
        String username = authService.getUserDetails().getUsername();
        User user = userService.findByUsername(username);  
        Url newUrl = new Url(
            shortUrl,
            url.getLongUrl(),
            user.getId()
        );
        return urlRepository.save(newUrl); 
    }
}
