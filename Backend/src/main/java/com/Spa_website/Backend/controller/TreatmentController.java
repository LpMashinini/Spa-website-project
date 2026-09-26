package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.model.Treatment;
import com.Spa_website.Backend.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/treatments")
public class TreatmentController {

    private final TreatmentRepository treatmentRepository;

    @GetMapping
    public ResponseEntity<List<Treatment>> getAllTreatments(){

        return ResponseEntity.ok(treatmentRepository.findAll());
    }
}
