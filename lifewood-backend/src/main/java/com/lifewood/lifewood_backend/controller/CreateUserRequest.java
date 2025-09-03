package com.lifewood.lifewood_backend.controller;

// This simple 'record' is a modern Java feature that creates a simple, immutable
// data transfer object. It tells Spring Boot to expect a JSON object
// with one field: "username".
public record CreateUserRequest(String username) {
}