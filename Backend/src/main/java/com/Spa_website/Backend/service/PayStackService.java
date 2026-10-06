package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.PayStackInitializeResponse;
import com.Spa_website.Backend.dto.PaystackInitializeRequest;
import com.Spa_website.Backend.dto.PaystackVerifyResponse;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.model.AppointmentStatus;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PayStackService {

    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    @Value("${paystack.secret-key}")
    private String secretKey;

    @Value("${paystack.base-url}")
    private String baseUrl;

    @Value("${paystack.callback-url}")
    private String callbackUrl;


    public PayStackInitializeResponse initializeAppointmentPayment(Long appointmentId){

        User user = getAuthenticatedUser();


        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));


        if (!appointment.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("You are not allowed to pay for this appointment");
        }

        if (appointment.getStatus() != AppointmentStatus.PENDING){
            throw new IllegalStateException("Only pending appointments can be paid");
        }


        BigDecimal treatmentPrice = appointment.getTreatment().getPrice();

        if (treatmentPrice == null || treatmentPrice.compareTo(BigDecimal.ZERO) <= 0){
            throw new IllegalStateException("Invalid treatment price");
        }

        long amountInCents = treatmentPrice
                .movePointRight(2)
                .setScale(0, RoundingMode.UNNECESSARY)
                .longValueExact();

        String reference = generateReference(appointmentId);

        PaystackInitializeRequest request = new PaystackInitializeRequest();


        request.setEmail(user.getEmail());
        request.setAmount(String.valueOf(amountInCents));
        request.setReference(reference);
        request.setCallback_url(callbackUrl);

        RestClient restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + secretKey
                ).defaultHeader(
                        HttpHeaders.CONTENT_TYPE,
                        MediaType.APPLICATION_JSON_VALUE
                ).build();

        PayStackInitializeResponse response = restClient
                .post()
                .uri("/transaction/initialize")
                .body(request)
                .retrieve()
                .body(PayStackInitializeResponse.class);

        if (response == null || !response.isStatus()){
            throw new IllegalStateException("Unable to initialize Paystack payment");
        }

        return response;

    }

    private String generateReference(Long appointmentId){
        return  "SPA-" + appointmentId
                + "-" +
                UUID.randomUUID()
                        .toString()
                        .replace("-", "");
    }

    private User getAuthenticatedUser(){

        String email = org.springframework.security.core.context
                .SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userService.getUserByEmail(email);


    }

    public PaystackVerifyResponse verifyTransaction(String reference){

        if (reference == null || reference.isBlank()){
            throw new IllegalArgumentException("Payment reference is required");
        }

        RestClient restClient = RestClient
                .builder()
                .baseUrl(baseUrl)
                .defaultHeader(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + secretKey
                ).build();

        PaystackVerifyResponse response = restClient
                .get()
                .uri("/transaction/verify/{reference}", reference)
                .retrieve()
                .body(PaystackVerifyResponse.class);

        if (response == null || !response.isStatus()){
            throw new IllegalStateException("Unable to verify paystack transactions");
        }


        return response;

    }


}

