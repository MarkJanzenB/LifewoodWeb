package com.lifewood.lifewood_backend.service;

import com.lifewood.lifewood_backend.model.Application;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final SendGrid sendGrid;
    private final String approvalTemplateId;

    // The constructor injects the API key and the Template ID from your properties
    public EmailService(
            @Value("${sendgrid.api.key}") String apiKey,
            @Value("${sendgrid.template.id}") String templateId) {
        this.sendGrid = new SendGrid(apiKey);
        this.approvalTemplateId = templateId;
    }

    public void sendApprovalEmail(Application application) {
        Email from = new Email("markjanzen123@gmail.com"); // Your verified sender
        Email to = new Email(application.getEmail());

        // Create a personalization object. This is where your dynamic data goes.
        Personalization personalization = new Personalization();
        personalization.addTo(to);

        // These keys must exactly match the {{...}} placeholders in your template
        personalization.addDynamicTemplateData("firstName", application.getFirstName());
        personalization.addDynamicTemplateData("project", application.getProject());
        personalization.addDynamicTemplateData("logoUrl", "https://lh3.googleusercontent.com/d/1AJs69EP-muWh8WfguGBiD0ZSnZmfzTeO");

        // Create the mail object, but without any HTML content
        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setSubject("Congratulations! Your Application to Lifewood has been Approved"); // This will be overridden by the template's subject
        mail.addPersonalization(personalization);
        mail.setTemplateId(this.approvalTemplateId); // This tells SendGrid which template to use

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            LOGGER.info("Approval email sent to {}. Status Code: {}", application.getEmail(), response.getStatusCode());
        } catch (IOException ex) {
            LOGGER.error("Error sending approval email to {}: {}", application.getEmail(), ex.getMessage());
        }
    }
}