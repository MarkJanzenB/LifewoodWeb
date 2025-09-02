package com.lifewood.lifewood_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepRenderAwakeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(KeepRenderAwakeService.class);

    // Use the URL of your own backend's public health endpoint
    private static final String PING_URL = "https://lifewoodweb.onrender.com/api/health";
    private final RestTemplate restTemplate = new RestTemplate();

    // Schedule to run every 10 minutes (600,000 milliseconds)
    @Scheduled(fixedDelay = 600000)
    public void ping() {
        try {
            // Make a request to our own health endpoint
            restTemplate.getForObject(PING_URL, String.class);
            LOGGER.info("Internal ping successful to prevent sleeping.");
        } catch (Exception e) {
            LOGGER.error("Internal ping failed: " + e.getMessage());
        }
    }
}