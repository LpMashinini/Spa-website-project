package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.PayStackInitializeResponse;
import com.Spa_website.Backend.service.PayStackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

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
}
