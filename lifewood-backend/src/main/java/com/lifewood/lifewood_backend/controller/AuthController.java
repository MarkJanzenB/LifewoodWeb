package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import com.lifewood.lifewood_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

record AuthRequest(String username, String password) {}
record AuthResponse(String jwt) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsService userDetailsService;
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

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

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.username());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }
}