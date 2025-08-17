package com.tradehub.seller_service.controller;

import com.tradehub.seller_service.model.Seller;
import com.tradehub.seller_service.model.SellerLoginResponse;
import com.tradehub.seller_service.security.JwtUtil;
import com.tradehub.seller_service.service.SellerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final JwtUtil jwtUtil;

    public SellerController(SellerService sellerService, JwtUtil jwtUtil) {
        this.sellerService = sellerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Seller> registerSeller(@RequestBody Seller seller) {
        Seller registeredSeller = sellerService.registerSeller(seller);
        return new ResponseEntity<>(registeredSeller, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers() {
        return new ResponseEntity<>(sellerService.getAllSellers(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<SellerLoginResponse> loginSeller(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        SellerLoginResponse response = sellerService.loginSeller(email, password);
        return ResponseEntity.ok(response);
    }
}

