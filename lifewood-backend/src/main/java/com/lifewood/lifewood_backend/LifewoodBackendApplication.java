package com.lifewood.lifewood_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling; // <-- IMPORT THIS


@EnableScheduling
@SpringBootApplication
public class LifewoodBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(LifewoodBackendApplication.class, args);
        System.out.println("Server up, up, up\n" +
                "It's our moment\n" +
                "You know together we're glowing\n" +
                "Gonna be, gonna be goldеn  ");
    }
}