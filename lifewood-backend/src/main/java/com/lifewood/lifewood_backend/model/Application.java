package com.lifewood.lifewood_backend.model;

import jakarta.persistence.*; // <-- Import this
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp; // <-- Import this
import org.hibernate.annotations.UpdateTimestamp;   // <-- Import this
import java.time.LocalDateTime; // <-- Import this

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
    private String experience;
    @Column(unique = true) // It's good practice to ensure emails are unique
    private String email;
    private String project;
    private String status = "New";
    private String resumeFilename;
    private String resumeContentType;

    // --- NEW: AUTOMATIC TIMESTAMPS ---
    @CreationTimestamp
    @Column(updatable = false) // This field should not be changed after creation
    private LocalDateTime createdAt;

    @UpdateTimestamp // This field will be automatically updated whenever the entity is saved
    private LocalDateTime updatedAt;
}