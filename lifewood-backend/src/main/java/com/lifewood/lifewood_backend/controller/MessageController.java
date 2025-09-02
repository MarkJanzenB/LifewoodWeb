package com.lifewood.lifewood_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // General path for miscellaneous endpoints
public class MessageController {

    /**
     * A simple message endpoint, recycled from the capstone project,
     * to be used by the internal KeepRenderAwakeService.
     */
    @GetMapping("/message")
    public String testMessage() {
        return "Lifewood backend is working";
    }
}