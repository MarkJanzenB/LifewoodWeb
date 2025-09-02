package com.lifewood.lifewood_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KeepRenderAwakeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(KeepRenderAwakeService.class);

    // --- UPDATED to use the new /api/message endpoint ---
    private static final String PING_URL = "https://lifewoodweb.onrender.com/api/message";
    private final RestTemplate restTemplate = new RestTemplate();

    // Schedule to run every 10 minutes (600,000 milliseconds)
    @Scheduled(fixedDelay = 600000)
    public void ping() {
        try {
            // This will call the testMessage() method in our new controller
            String response = restTemplate.getForObject(PING_URL, String.class);
            LOGGER.info("Internal ping successful. Response: '{}'", response);
        } catch (Exception e) {
            LOGGER.error("Internal ping failed: " + e.getMessage());
        }
    }
}