package com.Spa_website.Backend.service;

import com.Spa_website.Backend.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRATION_MINUTES = 5;

    private final OtpRepository otpRepository;

    public String generateOtp(){
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < OTP_LENGTH; i++){
            otp.append(random.nextDouble(10));
        }

        return otp.toString();
    }
}
