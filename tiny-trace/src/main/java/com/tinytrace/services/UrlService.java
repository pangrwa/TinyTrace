package com.tinytrace.services;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

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

    public Url findByShortUrl(String shortUrlId) {
        return urlRepository.findByShortUrl(shortUrlId).orElseThrow(
                () -> new UrlNotFoundException(shortUrlId));
    }

    public Stream<Url> findByUserId() {
        String username = authService.getUserDetails().getUsername();
        String userId = userService.findByUsername(username).getId();
        return StreamSupport.stream(
                urlRepository.findByUserId(userId).spliterator(), false);
    }

    public Stream<Url> findAll() {
        return StreamSupport.stream(
                urlRepository.findAll().spliterator(), false);
    }

    public Url createUrl(Url url) {
        String shortUrlId = urlShorterningService.getShortUrl();
        String username = authService.getUserDetails().getUsername();
        User user = userService.findByUsername(username);
        Url newUrl = new Url(
                shortUrlId,
                url.getLongUrl(),
                user.getId());
        return urlRepository.save(newUrl);
    }
}
