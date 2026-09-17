package com.Spa_website.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "Otps")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Otp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expiresAt", nullable = false)
    private  LocalDateTime expiresAt;

    @Column(name = "verified", nullable = false)
    private boolean verified;

    @Column(name = "type", nullable = false)
    private OtpType type;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
