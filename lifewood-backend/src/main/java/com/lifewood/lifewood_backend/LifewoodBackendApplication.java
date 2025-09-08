package com.lifewood.lifewood_backend;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class LifewoodBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LifewoodBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(AdminUserRepository adminUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!adminUserRepository.findByUsername("root").isPresent()) {
                System.out.println(">>> Initializing 'root' user...");
                AdminUser rootUser = new AdminUser("root", passwordEncoder.encode("root"));
                rootUser.setPasswordChangeRequired(true);
                rootUser.setRole("ROOT");
                adminUserRepository.save(rootUser);
                System.out.println(">>> Root initialized successfully.");
            }
        };
    }
}