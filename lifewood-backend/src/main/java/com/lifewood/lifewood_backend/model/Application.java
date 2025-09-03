package com.lifewood.lifewood_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

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
    private String email;
    private String project;

    // Can be "New", "Approved", "Rejected"
    private String status = "New";
    // --- NEW FIELDS: Resume File Information ---
    private String resumeFilename; // e.g., "john_doe_resume.pdf"
    private String resumeContentType; // e.g., "application/pdf"

}