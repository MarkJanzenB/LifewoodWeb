package com.lifewood.lifewood_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
public class StartupMessageRunner implements CommandLineRunner {

    // --- THIS LINE IS NOW CORRECTED ---
    // If 'server.port' is not found in application.properties, it will default to "8080"
    @Value("${server.port:8080}")
    private String serverPort;

    @Override
    public void run(String... args) throws Exception {
        // This code will execute once the application is fully started.
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  Lifewood Backend Server is UP AND RUNNING!");
        System.out.println("  ");
        System.out.println("  Application is now ready to accept connections.");
        System.out.println("  API is running on: http://localhost:" + serverPort);
        System.out.println("=".repeat(60) + "\n");
    }
}