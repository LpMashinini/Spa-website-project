package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.AppointmentResponse;
import com.Spa_website.Backend.dto.CreateAppointmentRequest;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/book-appointment")
    public ResponseEntity<AppointmentResponse> createAppointment(@Valid @RequestBody CreateAppointmentRequest request){

        AppointmentResponse response =  appointmentService.createAppointment(request);


        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId){

        appointmentService.cancelAppointment(appointmentId);

        return ResponseEntity.ok("Appointment cancelled successfully");

    }



}
