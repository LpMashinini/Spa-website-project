package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.PaystackVerifyData;
import com.Spa_website.Backend.entity.Appointment;
import com.Spa_website.Backend.entity.AppointmentStatus;
import com.Spa_website.Backend.entity.Payment;
import com.Spa_website.Backend.entity.PaymentStatus;
import com.Spa_website.Backend.events.AppointmentConfirmedEvent;
import com.Spa_website.Backend.repository.AppointmentRepository;
import com.Spa_website.Backend.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentProcessingService {

    private final PaymentRepository paymentRepository;
    private final AppointmentRepository appointmentRepository;
    private final ApplicationEventPublisher eventPublisher;

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

        if (transaction.getAmount() == null ){
            throw new IllegalStateException("Payment amount is missing");
        }

        long paystackAmount;

        try{
            paystackAmount = Long.parseLong(transaction.getAmount());
        } catch (NumberFormatException e) {
            throw new IllegalStateException("Invalid Paystack amount");
        }

        if (paystackAmount != expectedAmount){
            throw new IllegalStateException(
                    "Payment amount mismatch. Expected: " + expectedAmount
                    + ", received" + paystackAmount
            );
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

        eventPublisher.publishEvent(
                new AppointmentConfirmedEvent(appointment.getId())
        );

    }
}
