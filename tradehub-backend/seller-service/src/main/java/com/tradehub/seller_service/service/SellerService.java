package com.tradehub.seller_service.service;

import com.tradehub.seller_service.model.Seller;
import com.tradehub.seller_service.model.SellerLoginResponse;
import com.tradehub.seller_service.repository.SellerRepository;
import com.tradehub.seller_service.security.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;
    private final JwtUtil jwtUtil;

    public SellerService(SellerRepository sellerRepository, JwtUtil jwtUtil) {
        this.sellerRepository = sellerRepository;
        this.jwtUtil = jwtUtil;
    }

    public Seller registerSeller(Seller seller) {
        return sellerRepository.save(seller);
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public SellerLoginResponse loginSeller(String email, String password) {
        Optional<Seller> optionalSeller = sellerRepository.findByEmail(email);
        if (optionalSeller.isPresent() && optionalSeller.get().getPassword().equals(password)) {
            Seller seller = optionalSeller.get();
            String token = jwtUtil.generateToken(seller.getEmail());
            return new SellerLoginResponse(seller.getEmail(), token);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public Seller getSellerByEmail(String email) {
        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }
}
