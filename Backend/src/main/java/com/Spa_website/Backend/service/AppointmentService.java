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

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;
    private final UserService userService;

    private User getAuthenticatedUser(){

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userService.getUserByEmail(email);
    }


    @Transactional
    public Appointment createAppointment(CreateAppointmentRequest request){

        User user = getAuthenticatedUser();


        Treatment treatment = treatmentRepository.findById(request.getTreatmentId())
                .orElseThrow(() -> new IllegalArgumentException("Treatment not found"));


       Appointment appointment = new Appointment();

       appointment.setTitle(request.getTitle());
       appointment.setUser(user);
       appointment.setNumberOfGuest(request.getNumberOfGuests());
       appointment.setAppointmentDate(request.getAppointmentDate());
       appointment.setStatus(AppointmentStatus.PENDING);
       appointment.setTreatment(treatment);

       return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment cancelAppointment(Long appointmentId){

        User user = getAuthenticatedUser();

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        if(!appointment.getUser().getId().equals(user.getId())){
            throw new IllegalArgumentException("You are not allowed to cancel this appointment");
        }

        if (appointment.getStatus() == AppointmentStatus.CANCELLED){
            throw new IllegalStateException("Appointment has already been cancelled");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETED){
            throw new IllegalStateException("Completed appointments cannot be cancelled");
        }

        if (!LocalDate.now().isBefore(appointment.getAppointmentDate())){
            throw new IllegalStateException("Appointments cannot be cancelled on or after the appointment date");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        return appointmentRepository.save(appointment);
    }



}
