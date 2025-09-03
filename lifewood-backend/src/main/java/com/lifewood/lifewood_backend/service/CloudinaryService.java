package com.lifewood.lifewood_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud_name}") String cloudName,
            @Value("${cloudinary.api_key}") String apiKey,
            @Value("${cloudinary.api_secret}") String apiSecret) {

        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public Map<String, String> uploadFile(MultipartFile file) {
        try {
            // --- THIS IS THE CRITICAL CHANGE ---
            // We are adding the 'resource_type: "auto"' parameter.
            // This tells Cloudinary to intelligently inspect the file and apply
            // the best transformations, which includes making PDFs viewable.
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "resource_type", "auto"
            ));

            String url = (String) uploadResult.get("secure_url");


            String publicId = (String) uploadResult.get("public_id");
            String contentType = (String) uploadResult.get("resource_type") + "/" + (String) uploadResult.get("format");

            return Map.of("url", url, "publicId", publicId, "contentType", contentType);

        } catch (IOException e) {
            throw new RuntimeException("Could not upload file to Cloudinary", e);
        }
    }
}