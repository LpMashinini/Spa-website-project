package com.Spa_website.Backend.service;

import com.Spa_website.Backend.model.Otp;
import com.Spa_website.Backend.model.OtpType;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
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

    public Otp createOtp(User user, OtpType type){

        //cleanUpExpiredOtp(user.getId());

        String code = generateOtp();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiredAt = now.plusMinutes(OTP_EXPIRATION_MINUTES);

        Otp otp = new Otp();
        otp.setCode(code);
        otp.setCreatedAt(now);
        otp.setVerified(false);
        otp.setType(type);
        otp.setExpiresAt(expiredAt);
        otp.setUser(user);

        return  otpRepository.save(otp);
    }


    public boolean ValidateOtp(User user, String code, OtpType type){

        LocalDateTime now = LocalDateTime.now();
        Optional<Otp> otpOptional = otpRepository.findByCodeAndUser_IdAndTypeAndVerifiedIsFalseAndExpiresAtAfter(
                code, user.getId(), type, now

        );

        if (otpOptional.isPresent()){
            Otp otp = otpOptional.get();
            otp.setVerified(true);
            otpRepository.save(otp);

            return true;

        }

        return false;
    }

}
