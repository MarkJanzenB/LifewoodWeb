package com.lifewood.lifewood_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import com.lifewood.lifewood_backend.service.CloudinaryService; // <-- IMPORT NEW SERVICE
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired private ApplicationService applicationService;
    @Autowired private CloudinaryService cloudinaryService; // <-- INJECT NEW SERVICE

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Application> createApplication(
            @RequestParam("application") String applicationJson,
            @RequestParam("resume") MultipartFile resumeFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Application application = objectMapper.readValue(applicationJson, Application.class);

            // Upload the file to Cloudinary and get the results
            Map<String, String> uploadResult = cloudinaryService.uploadFile(resumeFile);

            // --- CRITICAL CHANGE ---
            // We now store the public URL from Cloudinary, not a local filename
            application.setResumeFilename(uploadResult.get("url"));
            application.setResumeContentType(uploadResult.get("contentType"));

            Application savedApplication = applicationService.saveApplication(application);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            e.printStackTrace(); // Good for debugging
            return ResponseEntity.badRequest().build();
        }
    }
}