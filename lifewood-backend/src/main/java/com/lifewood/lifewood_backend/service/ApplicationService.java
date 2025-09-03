package com.lifewood.lifewood_backend.service;

import com.lifewood.lifewood_backend.model.Application;
import com.lifewood.lifewood_backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional; // <-- Make sure this import is present

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository repository;

    public Application saveApplication(Application application) {
        return repository.save(application);
    }

    public List<Application> getAllApplications() {
        return repository.findAll();
    }

    // --- THIS IS THE MISSING METHOD ---
    public Optional<Application> getApplicationById(Long id) {
        return repository.findById(id);
    }

    public void deleteApplication(Long id) {
        repository.deleteById(id);
    }

    public Application updateApplication(Long id, Application updatedApp) {
        return repository.findById(id).map(app -> {
            app.setFirstName(updatedApp.getFirstName());
            app.setLastName(updatedApp.getLastName());
            app.setAge(updatedApp.getAge());
            app.setDegree(updatedApp.getDegree());
            app.setExperience(updatedApp.getExperience());
            app.setEmail(updatedApp.getEmail());
            app.setProject(updatedApp.getProject());
            app.setStatus(updatedApp.getStatus());
            return repository.save(app);
        }).orElseThrow(() -> new RuntimeException("Application not found with id " + id));
    }
}