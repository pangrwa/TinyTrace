package com.tinytrace.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.data.domain.PageRequest;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.tinytrace.controllers.UrlController;
import com.tinytrace.models.Url;

@Component
public class UrlModelAssembler implements RepresentationModelAssembler<Url, EntityModel<Url>> {

    @Override
    public EntityModel<Url> toModel(Url url) {
        return EntityModel.of(url,
                linkTo(
                        methodOn(UrlController.class).getUrlById(url.getId())).withSelfRel(),
                linkTo(
                        methodOn(UrlController.class).getAllUrls(PageRequest.of(0, 20))).withRel("urls"));
    }
}
