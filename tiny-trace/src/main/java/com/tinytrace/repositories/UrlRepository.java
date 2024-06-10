package com.tinytrace.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.tinytrace.models.Url;

// mongoRepo extends PagingandSortingRepo which auto implement methods that takes in Pageable
public interface UrlRepository extends MongoRepository<Url, String> {
    
    Optional<Url> findByShortUrlId(String shortUrlId); 

    List<Url> findByUserId(String userId);  

    Page<Url> findByUserId(String userId, Pageable pageable);
    
    long countByUserId(String userId); 

    boolean existsByShortUrlId(String shortUrlId); 
}
