package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired private ApplicationService applicationService;
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    // --- APPLICATION MANAGEMENT ---
    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    // --- USER MANAGEMENT ---
    @PostMapping("/users")
    public ResponseEntity<?> createAdminUser(@RequestBody Map<String, String> payload) {
        String newUsername = payload.get("username");
        if (newUsername == null || newUsername.isBlank()) {
            return ResponseEntity.badRequest().body("Username cannot be empty.");
        }
        if (adminUserRepository.findByUsername(newUsername).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        AdminUser newAdmin = new AdminUser(newUsername, passwordEncoder.encode("root"));
        newAdmin.setPasswordChangeRequired(true);
        adminUserRepository.save(newAdmin);
        return ResponseEntity.ok("Admin user created successfully. Default password is 'root'.");
    }

    // --- NEW: GET ALL ADMIN USERS ---
    @GetMapping("/users")
    public List<AdminUser> getAllAdminUsers() {
        return adminUserRepository.findAll();
    }

    // --- NEW: DELETE A USER (WITH SECURITY CHECKS) ---
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteAdminUser(@PathVariable Long id, Authentication authentication) {
        String currentUsername = authentication.getName();
        AdminUser userToDelete = adminUserRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User to delete not found"));

        if (userToDelete.getUsername().equals("root")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("The root user cannot be deleted.");
        }
        if (userToDelete.getUsername().equals(currentUsername)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot delete your own account.");
        }

        adminUserRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // --- NEW: RESET A USER'S PASSWORD (WITH SECURITY CHECKS) ---
    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<?> resetAdminPassword(@PathVariable Long id) {
        AdminUser userToReset = adminUserRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User to reset not found"));

        if (userToReset.getUsername().equals("root")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("The root user's password cannot be reset from here.");
        }

        userToReset.setPassword(passwordEncoder.encode("root"));
        userToReset.setPasswordChangeRequired(true);
        adminUserRepository.save(userToReset);

        return ResponseEntity.ok("User password has been reset to 'root'.");
    }
}