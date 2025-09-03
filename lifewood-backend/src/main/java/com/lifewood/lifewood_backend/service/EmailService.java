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
    private final String rejectionTemplateId; // <-- NEW FIELD

    public EmailService(
            @Value("${sendgrid.api.key}") String apiKey,
            @Value("${sendgrid.approval.template.id}") String approvalTemplateId,
            @Value("${sendgrid.rejection.template.id}") String rejectionTemplateId) { // <-- NEW PARAMETER
        this.sendGrid = new SendGrid(apiKey);
        this.approvalTemplateId = approvalTemplateId;
        this.rejectionTemplateId = rejectionTemplateId; // <-- SET NEW FIELD
    }

    public void sendApprovalEmail(Application application) {
        Email from = new Email("markjanzen123@gmail.com");
        Email to = new Email(application.getEmail());
        Personalization personalization = new Personalization();
        personalization.addTo(to);
        personalization.addDynamicTemplateData("firstName", application.getFirstName());
        personalization.addDynamicTemplateData("project", application.getProject());
        personalization.addDynamicTemplateData("logoUrl", "https://lh3.googleusercontent.com/d/1AJs69EP-muWh8WfguGBiD0ZSnZmfzTeO");

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setSubject("Congratulations! Your Application to Lifewood has been Approved");
        mail.addPersonalization(personalization);
        mail.setTemplateId(this.approvalTemplateId);

        sendMail(mail, application.getEmail());
    }

    // --- NEW METHOD FOR REJECTION EMAILS ---
    public void sendRejectionEmail(Application application) {
        Email from = new Email("markjanzen123@gmail.com");
        Email to = new Email(application.getEmail());
        Personalization personalization = new Personalization();
        personalization.addTo(to);
        personalization.addDynamicTemplateData("firstName", application.getFirstName());
        personalization.addDynamicTemplateData("project", application.getProject());
        personalization.addDynamicTemplateData("logoUrl", "https://lh3.googleusercontent.com/d/1AJs69EP-muWh8WfguGBiD0ZSnZmfzTeO");

        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setSubject("An Update on Your Lifewood Application");
        mail.addPersonalization(personalization);
        mail.setTemplateId(this.rejectionTemplateId); // <-- USE THE REJECTION TEMPLATE

        sendMail(mail, application.getEmail());
    }

    // Helper method to avoid duplicate code
    private void sendMail(Mail mail, String emailTo) {
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            LOGGER.info("Email sent to {}. Status Code: {}", emailTo, response.getStatusCode());
        } catch (IOException ex) {
            LOGGER.error("Error sending email to {}: {}", emailTo, ex.getMessage());
        }
    }
}