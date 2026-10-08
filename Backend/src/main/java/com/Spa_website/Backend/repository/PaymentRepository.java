package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByReference(String reference);

    Optional<Payment> findByAppointmentId(Long appointmentId);

    Boolean existsByReference(String reference);

    Boolean existsByAppointment(Long appointmentId);

}
