package com.tinytrace.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tinytrace.models.Url;

public interface UrlRepository extends MongoRepository<Url, String> {
    
    Optional<Url> findByShortUrl(String shortUrlId); 

    List<Url> findByUserId(String userId);  
}
