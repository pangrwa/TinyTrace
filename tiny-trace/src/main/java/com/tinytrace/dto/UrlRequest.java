package com.tinytrace.dto;

import com.tinytrace.validations.UrlConstraint;

public record UrlRequest(
    String shortUrlId,
    @UrlConstraint
    String longUrl, 
    String userId
) {}

