package com.tinytrace.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    @Value("${SECURITY_JWT_SECRET_KEY:null}")
    private String secretKey;  

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    } 

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token); 
        return claimsResolver.apply(claims); 
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignInKey()).build().parseSignedClaims(token).getPayload();
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails); 
    }
    public String generateToken(Map<String, Object> claims, UserDetails UserDetails) { 
        return Jwts.builder()
            .claims().empty().add(claims).subject(UserDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) // set for 24 hours
            .and()
            .signWith(getSignInKey()).compact();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); 
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); 
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token); 
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); 
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
