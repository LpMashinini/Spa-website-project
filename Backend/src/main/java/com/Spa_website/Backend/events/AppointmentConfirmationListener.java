package com.Spa_website.Backend.events;

import com.Spa_website.Backend.entity.Appointment;
import com.Spa_website.Backend.entity.Payment;
import com.Spa_website.Backend.repository.AppointmentRepository;
import com.Spa_website.Backend.repository.PaymentRepository;
import com.Spa_website.Backend.service.AppointmentEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class AppointmentConfirmationListener {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentEmailService appointmentEmailService;
    private final PaymentRepository paymentRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAppointmentConfirmed(AppointmentConfirmedEvent event){

        Appointment appointment = appointmentRepository.findById(event.appointmentId())
                        .orElseThrow( () -> new IllegalStateException("Appointment not found"));

        Payment payment = paymentRepository.findByAppointment_Id(appointment.getId())
                        .orElseThrow( () -> new IllegalStateException("Payment not found"));

        appointmentEmailService.sendAppointmentConfirmation(
                appointment.getUser().getName(),
                appointment.getUser().getEmail(),
                appointment.getTreatment().getName(),
                payment.getAmount(),
                appointment.getAppointmentDate(),
                appointment.getNumberOfGuest(),
                appointment.getId(),
                payment.getReference()
        );
    }
}
