package com.Spa_website.Backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAppointmentRequest {

    @NotEmpty(message = "Title is required")
    private String title;

    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date cannot be in the past")
    private LocalDate appointmentDate;

    @NotNull(message = "Number of guest is required")
    @Min(value = 1, message = "At least one guest is required")
    private Integer numberOfGuests;

    @NotEmpty(message = "Treatment is required")
    private Long treatmentId;

}
