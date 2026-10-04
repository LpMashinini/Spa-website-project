package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.PayStackInitializeResponse;
import com.Spa_website.Backend.model.Appointment;
import com.Spa_website.Backend.model.AppointmentStatus;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class PayStackService {

    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    @Value("${paystack.secret-key}")
    private String secretKey;

    @Value("${paystack.base-url}")
    private String baseUrl;

    @Value("${paystack.callback-url}")
    private String callbackUrl;




    private User getAuthenticatedUser(){

        String email = org.springframework.security.core.context
                .SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userService.getUserByEmail(email);
    }


}

