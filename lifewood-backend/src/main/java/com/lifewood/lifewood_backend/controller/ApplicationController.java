package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import com.lifewood.lifewood_backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired private ApplicationService applicationService;
    @Autowired private FileStorageService fileStorageService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Application> createApplication(
            @RequestParam("application") String applicationJson,
            @RequestParam("resume") MultipartFile resumeFile) {
        try {
            // Convert the JSON string part into an Application object
            ObjectMapper objectMapper = new ObjectMapper();
            Application application = objectMapper.readValue(applicationJson, Application.class);

            // Store the file and set the details on the application object
            String uniqueFilename = fileStorageService.store(resumeFile);
            application.setResumeFilename(uniqueFilename);
            application.setResumeContentType(fileStorageService.detectContentType(resumeFile));

            // Save the complete application object to the database
            Application savedApplication = applicationService.saveApplication(application);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            // Handle JSON parsing errors or file storage errors
            return ResponseEntity.badRequest().build();
        }
    }
}