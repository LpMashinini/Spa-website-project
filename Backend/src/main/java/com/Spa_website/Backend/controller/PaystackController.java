package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.PayStackInitializeResponse;
import com.Spa_website.Backend.dto.PaystackVerifyResponse;
import com.Spa_website.Backend.service.PayStackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payments")
public class PaystackController {

    private final PayStackService payStackService;

    @PostMapping("/appointment/{appointmentId}")
    public ResponseEntity<PayStackInitializeResponse> initializePayment(
            @PathVariable Long appointmentId
    ) {
        PayStackInitializeResponse response = payStackService.initializeAppointmentPayment(appointmentId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify-payment{reference}")
    public ResponseEntity<PaystackVerifyResponse> verifyPayment( @PathVariable String reference){

        PaystackVerifyResponse response = payStackService.verifyTransaction(reference);

        return ResponseEntity.ok(response);
    }
}
