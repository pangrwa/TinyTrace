package com.tinytrace.models;

import java.util.Objects;

import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class Url {
    
    private String id; 
    @Indexed(unique=true) 
    private String shortUrlId; 
    private String longUrl;
    private String userId; 
    
    public Url(String shortUrlId, String longUrl, String userId) {
        this.shortUrlId = shortUrlId;
        this.longUrl = longUrl;
        this.userId = userId;   
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true; 
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        } 
        Url url = (Url) o; 
        return Objects.equals(id, url.id) &&
            Objects.equals(shortUrlId, url.shortUrlId) &&
            Objects.equals(longUrl, url.longUrl) &&  
            Objects.equals(userId, url.userId);   
    }

    @Override
    public String toString() {
        return String.format(
            "Url{id=%s, shortUrlId=%s, longUrl=%s, userId=%s}", id, shortUrlId, longUrl, userId 
        );
    }
}
