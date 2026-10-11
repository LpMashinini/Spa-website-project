package com.Spa_website.Backend.service;

import com.Spa_website.Backend.model.Payment;
import com.Spa_website.Backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentProcessingService {

    private final PaymentRepository paymentRepository;
    private final Payment payment;

    void processVerifiedPayment(String reference , String transaction){}
}
