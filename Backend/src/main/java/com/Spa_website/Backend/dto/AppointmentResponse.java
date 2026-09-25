package com.Spa_website.Backend.dto;

import com.Spa_website.Backend.model.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {

    private Long id;
    private String title;
    private Integer numberOfGuests;
    private LocalDate appointmentDate;
    private AppointmentStatus status;
    private Long treatmentId;
    private String treatmentName;

}
