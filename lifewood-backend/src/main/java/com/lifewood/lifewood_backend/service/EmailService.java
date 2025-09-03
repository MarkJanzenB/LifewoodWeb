package com.lifewood.lifewood_backend.service;

import com.lifewood.lifewood_backend.model.Application;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    private final SendGrid sendGrid;

    // The constructor takes the API key injected from application.properties
    public EmailService(@Value("${sendgrid.api.key}") String apiKey) {
        this.sendGrid = new SendGrid(apiKey);
    }

    public void sendApprovalEmail(Application application) {
        // IMPORTANT: This email must match the one you verified on SendGrid
        Email from = new Email("markjanzen123@gmail.com");

        String subject = "Congratulations! Your Application to Lifewood has been Approved";
        Email to = new Email(application.getEmail());

        String htmlContent = "<html><body>"
                + "<h3>Dear " + application.getFirstName() + ",</h3>"
                + "<p>We are thrilled to inform you that your application for the <strong>" + application.getProject() + "</strong> project at Lifewood Data Technology has been <strong>approved</strong>!</p>"
                + "<p>We were very impressed with your qualifications and experience. Our team will be in contact with you shortly with the next steps.</p>"
                + "<p>Congratulations again, and welcome to the team!</p>"
                + "<br/>"
                + "<p>Best regards,</p>"
                + "<p><strong>The Lifewood Team</strong></p>"
                + "</body></html>";

        Content content = new Content("text/html", htmlContent);
        Mail mail = new Mail(from, subject, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            LOGGER.info("Approval email sent to {}. Status Code: {}", application.getEmail(), response.getStatusCode());
        } catch (IOException ex) {
            LOGGER.error("Error sending approval email to {}: {}", application.getEmail(), ex.getMessage());
            // Optionally re-throw a custom exception if you want the controller to know about the failure
        }
    }
}