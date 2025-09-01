package com.lifewood.lifewood_backend.repository;

import com.lifewood.lifewood_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}