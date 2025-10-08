package com.tradehub.product_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class JwtUtils {

    private final String SECRET_KEY = "my_super_secret_key_12345678901234567890"; 

    public Long extractSellerId(String authHeader) {
        try {
            String token = authHeader.substring(7);
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.get("id", Long.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired JWT token");
        }
    }
}
