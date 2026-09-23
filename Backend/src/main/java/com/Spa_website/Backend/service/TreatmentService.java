package com.Spa_website.Backend.service;

import com.Spa_website.Backend.model.Treatment;
import com.Spa_website.Backend.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;


    public List<Treatment> getAllTreatments(){
        return treatmentRepository.findAll();
    }

    public Treatment getTreatmentById(Long id) {
        return treatmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Treatment not found"));
    }
}
