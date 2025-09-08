package com.lifewood.lifewood_backend.config;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StartupUserInitializer implements CommandLineRunner {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!adminUserRepository.findByUsername("root").isPresent()) {
            System.out.println("Creating initial 'root' user...");
            AdminUser rootUser = new AdminUser("root", passwordEncoder.encode("root"));
            rootUser.setRole("ROOT"); // Set role for root user
            rootUser.setPasswordChangeRequired(true); // Ensure this is set
            adminUserRepository.save(rootUser);
            System.out.println("'root' user created successfully.");
        }
    }
}
