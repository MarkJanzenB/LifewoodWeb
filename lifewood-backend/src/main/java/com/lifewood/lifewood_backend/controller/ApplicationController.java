package com.lifewood.lifewood_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Application> createApplication(
            @RequestParam("application") String applicationJson,
            @RequestParam("resume") MultipartFile resumeFile) {
        try {
            // Convert the JSON string part into an Application object
            ObjectMapper objectMapper = new ObjectMapper();
            Application application = objectMapper.readValue(applicationJson, Application.class);

            // Set the file's binary data and metadata on the application object
            application.setResumeData(resumeFile.getBytes());
            application.setResumeFilename(resumeFile.getOriginalFilename());
            application.setResumeContentType(resumeFile.getContentType());

            Application savedApplication = applicationService.saveApplication(application);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}