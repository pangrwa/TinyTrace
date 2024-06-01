package com.tinytrace.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tinytrace.models.Url;
import com.tinytrace.services.UrlService;

import jakarta.validation.Valid;

import com.tinytrace.assembler.UrlModelAssembler;
import com.tinytrace.dto.UrlRequest;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UrlController {

    private final UrlService urlService;
    private final UrlModelAssembler urlModelAssembler;

    @GetMapping("/api/urls")
    public ResponseEntity<CollectionModel<EntityModel<Url>>> getAllUrls() {
    // todo: if admin ever came in, we would need to check if the user is an admin
    List<EntityModel<Url>> urls = urlService.findByUser() 
            .map(urlModelAssembler::toModel)
            .collect(Collectors.toList());
            CollectionModel<EntityModel<Url>> collectionModel = CollectionModel
            .of(urls, linkTo(
            methodOn(UrlController.class).getAllUrls()).withSelfRel());
    return ResponseEntity.ok().body(collectionModel);
    }

    @GetMapping("/api/urls/{id}")
    public ResponseEntity<EntityModel<Url>> getUrlById(@PathVariable String id) {
        Url url = urlService.findById(id);
        return ResponseEntity.ok().body(urlModelAssembler.toModel(url));
    }

    @GetMapping("/api/urls/")
    public ResponseEntity<EntityModel<Url>> getUrlByShortUrl(@RequestParam String shortUrlId) {
        Url url = urlService.findByShortUrlId(shortUrlId);
        return ResponseEntity.ok().body(urlModelAssembler.toModel(url));
    }

    //@GetMapping("/api/urls/users/{user-id}")
    //public ResponseEntity<CollectionModel<EntityModel<Url>>> getUrlByUserId(@PathVariable("user-id") String userId) {
    //    List<EntityModel<Url>> urls = urlService.findByUserId(userId)
    //            .map(urlModelAssembler::toModel)
    //            .collect(Collectors.toList());
    //    CollectionModel<EntityModel<Url>> collectionModel = CollectionModel
    //            .of(urls, linkTo(
    //                    methodOn(UrlController.class).getUrlByUserId(userId)).withSelfRel());
    //    return ResponseEntity.ok().body(collectionModel);
    //}

    @PostMapping("/api/urls")
    public ResponseEntity<EntityModel<Url>> createUrl(@Valid @RequestBody UrlRequest urlRequest) {
        Url newUrl = urlService.createUrl(urlRequest);
        return ResponseEntity.ok().body(urlModelAssembler.toModel(newUrl));
    }
}
