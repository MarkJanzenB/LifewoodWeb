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
    @Column(length = 2048) // Increased length for detailed experience
    private String experience;
    @Column(unique = true)
    private String email;
    private String project;
    private String status = "New";

    // --- REPLACED: The resumeLink String is gone ---

    // --- NEW: These fields store the file directly in the DB ---
    private String resumeFilename; // Stores the original filename (e.g., "my_resume.pdf")
    private String resumeContentType; // Stores the file type (e.g., "application/pdf")

    @Lob // Large Object: Tells JPA to store this as a large binary type (BLOB)
    @Column(columnDefinition = "LONGBLOB") // Be explicit for large files
    private byte[] resumeData;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}