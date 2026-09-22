package com.Spa_website.Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Email is required")
    @Column(name = "email", nullable = false)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull(message = "Number of guest is required")
    @Column(name = "number_of_guest", nullable = false)
    private Integer numberOfGuest;

    @NotBlank(message = "Treatment is required")
    @Column(name = "treatment", nullable = false)
    private String treatment;

    @NotNull(message = "Appointment date is required")
    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.BOOKED;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
