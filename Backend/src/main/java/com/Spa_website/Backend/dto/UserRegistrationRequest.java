package com.Spa_website.Backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationRequest {

    @Column(nullable = false)
    private String email;

    @Column(length = 20, nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;
}
