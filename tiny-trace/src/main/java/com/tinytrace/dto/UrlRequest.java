package com.tinytrace.dto;

import jakarta.validation.constraints.NotBlank;

public record UrlRequest(
    String shortUrlId,
    // todo: add URL constraint in the future
    @NotBlank(message = "Long URL cannot be blank.")
    String longUrl, 
    String userId
) {}

