package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.PaystackVerifyData;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.model.AppointmentStatus;
import com.Spa_website.Backend.model.Payment;
import com.Spa_website.Backend.model.PaymentStatus;
import com.Spa_website.Backend.repository.AppointmentRepository;
import com.Spa_website.Backend.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentProcessingService {

    private final PaymentRepository paymentRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public void processVerifiedPayment(String reference , PaystackVerifyData transaction){

        Payment payment = paymentRepository.findByReferenceForUpdate(reference)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        //Validate the paystack response against our database record

        if (transaction.getReference() == null || !payment.getReference().equals(reference) || !payment.getReference().equals(transaction.getReference())){
            throw new IllegalStateException("Payment reference mismatch");
        }

        long expectedAmount = payment.getAmount()
                .movePointRight(2)
                .longValueExact();

        if (transaction.getAmount() == null || !transaction.getAmount().equals(expectedAmount)){
            throw new IllegalStateException("Payment amount mismatch");
        }

        if (transaction.getCurrency() == null || !payment.getCurrency().equalsIgnoreCase(transaction.getCurrency())){
            throw new IllegalStateException("Payment currency mismatch");
        }

        if (!"success".equalsIgnoreCase(transaction.getStatus())){
            throw new IllegalStateException("Paystack transaction is not successful");
        }

        //Idempotency: don't process an already successful payment again
        if (payment.getStatus() == PaymentStatus.SUCCESS){
            return;
        }

        if (transaction.getId() == null){
            throw new IllegalStateException("Paystack transaction ID is missing");
        }

        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setTransactionId(transaction.getId());
        payment.setPaidAt(LocalDateTime.now());

        Appointment appointment = payment.getAppointment();
        appointment.setStatus(AppointmentStatus.BOOKED);

        paymentRepository.save(payment);
        appointmentRepository.save(appointment);

    }
}
