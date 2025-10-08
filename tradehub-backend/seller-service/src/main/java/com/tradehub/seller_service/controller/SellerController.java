package com.tradehub.seller_service.controller;

import com.tradehub.seller_service.model.Seller;
import com.tradehub.seller_service.security.JwtUtil;
import com.tradehub.seller_service.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sellers")
@CrossOrigin(origins = "http://localhost:5173")
public class SellerController {

    private final SellerService sellerService;
    private final JwtUtil jwtUtil;

    public SellerController(SellerService sellerService, JwtUtil jwtUtil) {
        this.sellerService = sellerService;
        this.jwtUtil = jwtUtil;
    }

    
    @PostMapping("/register")
    public ResponseEntity<Seller> registerSeller(@RequestBody Seller seller) {
        Seller savedSeller = sellerService.registerSeller(seller);
        return ResponseEntity.ok(savedSeller);
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> loginSeller(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String token = sellerService.loginSeller(email, password);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }


    @PutMapping("/update")
    public Seller updateSeller(@RequestBody Seller updatedSeller, 
                           @RequestHeader("Authorization") String authHeader) {
    
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

    
        Long sellerId = jwtUtil.extractSellerId(token);

    
    if (!jwtUtil.validateToken(token, email)) {
        throw new RuntimeException("Invalid or expired JWT token");
    }

    return sellerService.updateSeller(sellerId, updatedSeller);
}


    @GetMapping("/{email}")
    public ResponseEntity<Seller> getSellerByEmail(@PathVariable String email) {
        return ResponseEntity.ok(sellerService.getSellerByEmail(email));
    }

    @GetMapping("/profile")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> getSellerProfile(@RequestHeader("Authorization") String authHeader) {
    try {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(403).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Long sellerId = jwtUtil.extractSellerId(token);

        if (!jwtUtil.validateToken(token, email)) {
            return ResponseEntity.status(403).body("Invalid or expired JWT token");
        }

        Seller seller = sellerService.getSellerById(sellerId);
        return ResponseEntity.ok(seller);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
}
    @GetMapping("/internal/sellers/{id}")
    public Seller getSellerInternal(@PathVariable Long id) {
    return sellerService.getSellerById(id);
}

}
