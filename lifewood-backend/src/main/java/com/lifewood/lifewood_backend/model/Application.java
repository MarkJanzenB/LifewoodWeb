package com.lifewood.lifewood_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Data
@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    private String degree;
    @Column(length = 1024) // Make the experience field longer
    private String experience;
    @Column(unique = true)
    private String email;
    private String project;
    private String status = "New";

    // --- BY THIS NEW FIELD ---
    @Column(length = 1024) // Use a long column for potentially long URLs
    private String resumeLink;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}