package com.tinytrace.controllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.RepresentationModelProcessorInvoker.CollectionModelProcessorWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    private final PagedResourcesAssembler<Url> pagedResourcesAssembler; 

    @GetMapping("/api/urls")
    public ResponseEntity<PagedModel<EntityModel<Url>>> getAllUrls(
        Pageable pageable
    ) {
    // todo: if admin ever came in, we would need to check if the user is an admin
    // todo: consider the possiblity of just retrieving all the data if no pagination data is given
    Page<Url> urls = urlService.findByUser(pageable); 
    PagedModel<EntityModel<Url>> urlPagedModel = pagedResourcesAssembler.toModel(
        urls, urlModelAssembler
    );
    return ResponseEntity.ok()
        .contentType(MediaTypes.HAL_JSON)
        .body(urlPagedModel);
    }


    // have to fix case where shortUrlId last character is "/" which can cause it to go to a different endpoint
    @GetMapping("/api/urls/{shortUrlId}")
    public ResponseEntity<EntityModel<Url>> getUrlById(@PathVariable String shortUrlId) {
        System.out.println(shortUrlId); 
        Url url = urlService.findByShortUrlId(shortUrlId);
        return ResponseEntity.ok().body(urlModelAssembler.toModel(url));
    }

    @PostMapping("/api/urls")
    public ResponseEntity<EntityModel<Url>> createUrl(@Valid @RequestBody UrlRequest urlRequest) {
        Url newUrl = urlService.createUrl(urlRequest);
        return ResponseEntity.ok()
            .header("X-Total-Count", String.valueOf(urlService.countByUserId()))
            .body(urlModelAssembler.toModel(newUrl));
    }

    @DeleteMapping("/api/urls/{shortUrlId}")
    public ResponseEntity<?>deleteUrl(@PathVariable String shortUrlId) {
        urlService.deleteUrlbyShortUrlId(shortUrlId); 
        HashMap<String, String> response = new HashMap<>(); 
        response.put("success", "true"); 
        return ResponseEntity.ok()
            .header("X-Total-Count", String.valueOf(urlService.countByUserId()))
            .body(response);
    }
}
