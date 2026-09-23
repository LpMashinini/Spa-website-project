package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.CreateAppointmentRequest;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.model.AppointmentStatus;
import com.Spa_website.Backend.model.Treatment;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.repository.AppointmentRepository;
import com.Spa_website.Backend.repository.TreatmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentServices {

    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;
    private final UserService userService;


    @Transactional
    public Appointment createAppointment(CreateAppointmentRequest request){

        Treatment treatment = treatmentRepository.findById(request.getTreatmentId())
                .orElseThrow(() -> new IllegalArgumentException("Treatment not found"));


       Appointment appointment = new Appointment();

       appointment.setTitle(request.getTitle());
       appointment.setNumberOfGuest(request.getNumberOfGuests());
       appointment.setAppointmentDate(request.getAppointmentDate());
       appointment.setStatus(AppointmentStatus.BOOKED);
       appointment.setTreatment(treatment);

       return appointmentRepository.save(appointment);
    }

    private User getAuthenticatedUser(){

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userService.getUserByEmail(email);
    }

}
