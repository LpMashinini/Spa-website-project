package com.Spa_website.Backend.model;

import jakarta.persistence.*;
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

    @Column(name = "_title", nullable = false)
    private String title;

    @Column(name = "_email", nullable = false)
    private String email;

    @Column(name = "_phone_number", nullable = false)
    private String phoneNumber;


    @Column(name = "number_of_guest", nullable = false)
    private Integer numberOfGuest;

    @Column(name = "_treatment", nullable = false)
    private String treatment;

    @Column(name = "arrival_date", nullable = false)
    private LocalDate appointmentDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
