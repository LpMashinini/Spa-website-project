package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.CreateAppointmentRequest;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentServices {

    private final AppointmentRepository appointmentRepository;


}
