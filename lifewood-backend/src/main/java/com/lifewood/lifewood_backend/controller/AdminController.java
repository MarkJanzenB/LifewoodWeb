package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/applications")
public class AdminController {
    @Autowired
    private ApplicationService service;

    @GetMapping
    public List<Application> getAllApplications() {
        return service.getAllApplications();
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return service.saveApplication(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application appDetails) {
        Application updatedApp = service.updateApplication(id, appDetails);
        return ResponseEntity.ok(updatedApp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        service.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}