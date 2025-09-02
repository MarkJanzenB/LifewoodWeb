package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

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
}