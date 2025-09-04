package com.lifewood.lifewood_backend.repository;

import com.lifewood.lifewood_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // This is the new method that enables fetching applications by their status.
    List<Application> findByStatus(String status);
}