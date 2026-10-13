package com.Spa_website.Backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AppointmentEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;


    public void sendAppointmentConfirmation(
            String customerName,
            String customerEmail,
            String treatmentName,
            BigDecimal amount,
            LocalDate appointmentDate,
            Integer numberOfGuests,
            Long appointmentId,
            String paymentReference
    ){

        if (customerEmail == null || customerEmail.isBlank()){
            throw new IllegalArgumentException(
                    "Customer email is required"
            );
        }

        if (amount == null || appointmentDate == null || appointmentId == null){
            throw new IllegalArgumentException("Appointment confirmation details are incomplete");
        }

        String safeName = escapeHtml(
                customerName == null || customerName.isBlank()?
                        "Valued Customer" :
                        customerName
        );

        String safeTreatment = escapeHtml(
                treatmentName == null || treatmentName.isBlank()?
                        "SPA Treatment" : treatmentName
        );

        String safePaymentReference = escapeHtml(
                paymentReference == null || paymentReference.isBlank()?
                        "Not Provided" : paymentReference
        );

        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(
                Locale.forLanguageTag("en-ZA")
        );

        String formattedAmount = currencyFormat.format(amount);

        String formattedDate = appointmentDate.format(
                DateTimeFormatter.ofPattern(
                        "EEEE, dd MMMM yyyy 'at' HH:mm"
                )
        );

        String guestCount = numberOfGuests == null
                ? "Not specified"
                : numberOfGuests.toString();

        String subject = "Appointment Confirmed - Blissful & Balance";


        String html = """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#f7f4f0;
                             font-family:Arial,sans-serif;color:#333333;">
                  <div style="max-width:600px;margin:30px auto;
                              background:#ffffff;border-radius:12px;
                              overflow:hidden;border:1px solid #e8e0d7;">
                    <div style="background:#78634f;color:#ffffff;
                                padding:28px;text-align:center;">
                      <h1 style="margin:0;font-size:26px;">
                        Blissful &amp; Balance
                      </h1>
                      <p style="margin:10px 0 0;">
                        Appointment Confirmation
                      </p>
                    </div>

                    <div style="padding:28px;">
                      <h2 style="color:#78634f;">Your appointment is confirmed!</h2>
                      <p>Dear %s,</p>
                      <p>
                        Thank you for choosing Blissful &amp; Balance.
                        Your payment has been confirmed and your
                        appointment is booked.
                      </p>

                      <h3 style="color:#78634f;">Booking details</h3>

                      <table style="width:100%%;border-collapse:collapse;">
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Booking reference
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            #%s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Treatment
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            %s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Amount paid
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            %s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Appointment date
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            %s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Number of guests
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            %s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;">
                            Payment reference
                          </td>
                          <td style="padding:10px;border-bottom:1px solid #eeeeee;
                                     overflow-wrap:anywhere;">
                            %s
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px;">Payment status</td>
                          <td style="padding:10px;color:#287647;font-weight:bold;">
                            PAID
                          </td>
                        </tr>
                      </table>

                      <p style="margin-top:24px;">
                        Please keep this email for your records.
                        We look forward to welcoming you!
                      </p>

                      <p style="margin-top:28px;">
                        Warm regards,<br>
                        <strong>Blissful &amp; Balance</strong>
                      </p>
                    </div>

                    <div style="background:#f7f4f0;padding:16px;
                                text-align:center;font-size:12px;color:#777777;">
                      This is an automated appointment confirmation email.
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(
                        safeName,
                appointmentId,
                safeTreatment,
                escapeHtml(formattedAmount),
                escapeHtml(formattedDate),
                escapeHtml(guestCount),
                safePaymentReference
        );

        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    message, true, "UTF-8"
            );

            helper.setFrom(senderEmail, "Blissful & Balance");
            helper.setTo(customerEmail);
            helper.setSubject(subject);
            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException | MailException e) {
            throw new IllegalStateException("Could not send appointment confirmation email", e);
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException(
                    "Could not set the email sender name"
            );
        }


    }

    private String escapeHtml(String value){
        return value
                .replace("&","&amp")
                .replace("<", "&lt")
                .replace(">","&gt")
                .replace("\"", "&quot")
                .replace("'", "&#39");
    }


}
