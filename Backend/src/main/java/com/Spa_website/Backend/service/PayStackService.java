package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.PayStackInitializeResponse;
import com.Spa_website.Backend.dto.PaystackInitializeRequest;
import com.Spa_website.Backend.dto.PaystackVerifyData;
import com.Spa_website.Backend.dto.PaystackVerifyResponse;
import com.Spa_website.Backend.model.*;
import com.Spa_website.Backend.repository.AppointmentRepository;
import com.Spa_website.Backend.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PayStackService {

    private final AppointmentRepository appointmentRepository;
    private final UserService userService;
    private final PaymentRepository paymentRepository;

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

        if (paymentRepository.existsByAppointment(appointmentId)){
            throw new IllegalStateException("A payment already exists for this appointment");
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
        request.setCurrency("ZAR");
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

        if (response.getData() == null || response.getData().getReference() == null){
            throw new IllegalStateException("Paystack returned an invalid payment response");
        }

        Payment payment = new Payment();

        payment.setAppointment(appointment);
        payment.setReference(response.getData().getReference());
        payment.setAmount(treatmentPrice);
        payment.setCurrency("ZAR");
        payment.setStatus(PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());


        paymentRepository.save(payment);

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

    @Transactional
    public PaystackVerifyResponse verifyTransaction(String reference){

        if (reference == null || reference.isBlank()){
            throw new IllegalArgumentException("Payment reference is required");
        }

        Payment payment = paymentRepository.findByReference(reference)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));


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

        var transaction = response.getData();

        if (!"success".equalsIgnoreCase(transaction.getStatus())){
            throw new IllegalStateException("Paystack transaction is not successful");
        }

        long expectAmount = payment.getAmount()
                .movePointRight(2)
                .longValueExact();

        if (transaction.getAmount() == null || !transaction.getAmount().equals(expectAmount)){
            throw new IllegalStateException("Payment amount mismatch");
        }

        if (transaction.getCurrency() == null || !payment.getCurrency().equalsIgnoreCase(transaction.getCurrency())){
            throw new IllegalStateException("Payment currrency mismatch");
        }

        //verify the reference
        if (transaction.getReference() == null ||
                !payment.getReference().equals(transaction.getReference()) || payment.getReference().equals(reference)){

            throw new IllegalStateException("Payment reference mismatch");
        }



        if (payment.getStatus() != PaymentStatus.SUCCESS){

            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setTransactionId(Long.parseLong(transaction.getId()));
            payment.setPaidAt(LocalDateTime.now());

            payment.getAppointment().setStatus(AppointmentStatus.BOOKED);

            paymentRepository.save(payment);

            appointmentRepository.save(payment.getAppointment());

        }

        return response;

    }


}

