package com.tinytrace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.tinytrace.dto.AuthenticationResponse;
import com.tinytrace.services.JwtService;

import lombok.AllArgsConstructor;

import com.tinytrace.controllers.UrlController;

@Component
@AllArgsConstructor
public class AuthModelAssembler implements RepresentationModelAssembler<AuthenticationResponse, EntityModel<AuthenticationResponse>> {
    private final JwtService jwtService; 

    @Override
    public EntityModel<AuthenticationResponse> toModel(AuthenticationResponse authResponse) {
        return EntityModel.of(authResponse,
            linkTo(
                methodOn(UrlController.class).getUrlById(jwtService.extractUsername(authResponse.jwt()))
            ).withRel("urls")
        );
    }

}
