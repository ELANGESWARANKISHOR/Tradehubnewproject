package com.tradehub.user_service.controller;

import com.tradehub.user_service.model.LoginResponse;
import com.tradehub.user_service.model.User;
import com.tradehub.user_service.security.JwtUtil;
import com.tradehub.user_service.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");
    User user = userService.loginUser(email, password);

    // Generate JWT token
    String token = jwtUtil.generateToken(user.getEmail());

    Map<String, String> response = Map.of(
        "email", user.getEmail(),
        "token", token
    );

    return ResponseEntity.ok(response);
}
}
