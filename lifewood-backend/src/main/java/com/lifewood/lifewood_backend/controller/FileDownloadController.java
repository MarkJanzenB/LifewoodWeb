package com.lifewood.lifewood_backend.controller;

import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class FileDownloadController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/api/admin/applications/{id}/resume")
    public ResponseEntity<byte[]> downloadResume(@PathVariable Long id) {
        Application application = applicationService.getApplicationById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (application.getResumeData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + application.getResumeFilename() + "\"")
                .contentType(org.springframework.http.MediaType.parseMediaType(application.getResumeContentType()))
                .body(application.getResumeData());
    }
}