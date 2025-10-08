package com.tradehub.user_service.service;

import com.tradehub.user_service.model.CartItem;
import com.tradehub.user_service.model.User;
import com.tradehub.user_service.repository.UserRepository;
import com.tradehub.user_service.security.JwtUtil;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User loginUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            User user = optionalUser.get();
            
            String token = jwtUtil.generateToken(user.getEmail());
            user.setPassword(token); 
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public User getUserByEmail(String email) {
        throw new UnsupportedOperationException("Unimplemented method 'getUserByEmail'");
    }

    public User addToCart(Long userId, CartItem item) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        
        Optional<CartItem> existingItem = user.getCart().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            
            existingItem.get().setQuantity(existingItem.get().getQuantity() + item.getQuantity());
        } else {
            user.getCart().add(item);
        }

        return userRepository.save(user);
    }

    public User removeFromCart(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getCart().removeIf(item -> item.getProductId().equals(productId));

        return userRepository.save(user);
    }

    

    public List<CartItem> getCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCart();
    }

}
