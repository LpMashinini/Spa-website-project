package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
}
