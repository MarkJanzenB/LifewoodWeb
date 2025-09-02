package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import java.security.Principal;

// DTO for registration
record AuthRequest(String username, String password) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest authRequest) {
        if (adminUserRepository.findByUsername(authRequest.username()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        String hashedPassword = passwordEncoder.encode(authRequest.password());
        AdminUser newUser = new AdminUser(authRequest.username(), hashedPassword);
        adminUserRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");
    }

    // New endpoint for the frontend to check if a user is logged in
    @GetMapping("/profile")
    public ResponseEntity<UserDetails> getUserProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(userDetails);
    }
}