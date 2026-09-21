package com.Spa_website.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "_title", nullable = false)
    private String title;

    @Column(name = "_email", nullable = false, unique = true)
    private String email;

    @Column(name = "_phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "number_of_guest", nullable = false)
    private String guestNumber;

    @Column(name = "_treatment", nullable = false)
    private String treatment;

    @Column(name = "arrival_date", nullable = false)
    private String arrivalDate;
}
