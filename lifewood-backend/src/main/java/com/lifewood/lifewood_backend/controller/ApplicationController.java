package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        Application savedApplication = service.saveApplication(application);
        return ResponseEntity.ok(savedApplication);
    }
}