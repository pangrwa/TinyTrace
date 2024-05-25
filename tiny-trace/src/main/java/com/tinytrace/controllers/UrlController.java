package com.tinytrace.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.models.Url;
import com.tinytrace.services.UrlService;
import com.tinytrace.assembler.UrlModelAssembler;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UrlController {
   
    private final UrlService urlService;
    private final UrlModelAssembler urlModelAssembler;

    @GetMapping("/urls")
    public ResponseEntity<CollectionModel<EntityModel<Url>>> getAllUrls() {
        // todo: if admin ever came in, we would need to check if the user is an admin
        List<EntityModel<Url>> urls = urlService.findByUserId()
            .map(urlModelAssembler::toModel)
            .collect(Collectors.toList());
        CollectionModel<EntityModel<Url>> collectionModel = CollectionModel
            .of(urls, linkTo(
                methodOn(UrlController.class).getAllUrls()).withSelfRel()
            );
        return ResponseEntity.ok().body(collectionModel); 
    }

    @GetMapping("/urls/{id}") 
    public ResponseEntity<EntityModel<Url>> getUrlById(@PathVariable String id) {
        Url url = urlService.findById(id); 
        return ResponseEntity.ok().body(urlModelAssembler.toModel(url)); 
    }

    @GetMapping("/urls/{shortUrl}")
    public ResponseEntity<EntityModel<Url>> getUrlByShortUrl(@PathVariable String shortUrl) {
        Url url = urlService.findByShortUrl(shortUrl);
        return ResponseEntity.ok().body(urlModelAssembler.toModel(url));
    }
    

    @PostMapping("/urls") 
    public ResponseEntity<EntityModel<Url>> createUrl(Url url) {
        Url newUrl = urlService.createUrl(url); 
        return ResponseEntity.ok().body(urlModelAssembler.toModel(newUrl)); 
    }
    
}
