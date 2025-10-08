package com.tradehub.user_service.controller;

import com.tradehub.user_service.model.CartItem;
import com.tradehub.user_service.model.LoginResponse;
import com.tradehub.user_service.model.User;
import com.tradehub.user_service.security.JwtUtil;
import com.tradehub.user_service.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/login")
public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");
    User user = userService.loginUser(email, password);

    // Generate JWT token
    String token = jwtUtil.generateToken(user.getEmail());

    Map<String, Object> response = Map.of(
        "email", user.getEmail(),
        "userId", user.getId(),   
        "token", token
    );

    return ResponseEntity.ok(response);
}


    @PostMapping("/{userId}/cart")
    public ResponseEntity<User> addToCart(@PathVariable Long userId, @RequestBody CartItem item) {
        return ResponseEntity.ok(userService.addToCart(userId, item));
    }

    @DeleteMapping("/{userId}/cart/{productId}")
    public ResponseEntity<User> removeFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(userService.removeFromCart(userId, productId));
    }

    @GetMapping("/{userId}/cart")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getCart(userId));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, String> response = new HashMap<>();
        response.put("username", userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

}
