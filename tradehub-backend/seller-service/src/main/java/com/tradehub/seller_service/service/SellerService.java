package com.tradehub.seller_service.service;

import com.tradehub.seller_service.model.Seller;
import com.tradehub.seller_service.repository.SellerRepository;
import com.tradehub.seller_service.security.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    // ✅ Register seller — store password in plain text
    public Seller registerSeller(Seller seller) {
        // Just save directly
        return sellerRepository.save(seller);
    }

    // ✅ Login seller — compare plain password and generate JWT
    public String loginSeller(String email, String password) {
        Optional<Seller> optionalSeller = sellerRepository.findByEmail(email);

        if (optionalSeller.isPresent()) {
            Seller seller = optionalSeller.get();

            if (seller.getPassword().equals(password)) {
                // Generate token with both sellerId and email
                return jwtUtil.generateToken(seller.getId(), seller.getEmail());
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("Seller not found");
        }
    }

    public Seller updateSeller(Long sellerId, Seller updatedData) {
    Seller seller = sellerRepository.findById(sellerId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));

    
    seller.setShopname(updatedData.getShopname());
    seller.setContactNumber(updatedData.getContactNumber());
    seller.setDeliverycharge(updatedData.getDeliverycharge());

    return sellerRepository.save(seller);
}

    // ✅ Fetch all sellers
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    // ✅ Fetch by email
    public Seller getSellerByEmail(String email) {
        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
    }

    @GetMapping("/internal/{id}")
    public Seller getSellerInternal(@PathVariable Long id) {
        return sellerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Seller not found"));
}
    public Seller getSellerById(Long sellerId) {
    return sellerRepository.findById(sellerId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));
}
}
