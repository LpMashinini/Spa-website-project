package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.entity.Payment;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Payment p WHERE p.reference = :reference")
    Optional<Payment> findByReferenceForUpdate(
            @Param("reference") String reference
    );

    Optional<Payment> findByReference(String reference);

    Optional<Payment> findByAppointment_Id(Long appointmentId);

    boolean existsByReference(String reference);

    boolean existsByAppointment_Id(Long appointmentId);


}
