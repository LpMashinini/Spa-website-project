package com.Spa_website.Backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointment")
public class Appointment {
    private Long id;
    private String email;
    private String phone;
    private String guest;
    private String title;
    private String treatment;
    private String arrival;
}
