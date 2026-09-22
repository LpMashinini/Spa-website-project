package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApointmentRepository extends JpaRepository<Appointment, Long> {

}
