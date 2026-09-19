package com.Spa_website.Backend.service;

import com.Spa_website.Backend.dto.UserRegistrationRequest;
import com.Spa_website.Backend.model.Otp;
import com.Spa_website.Backend.model.OtpType;
import com.Spa_website.Backend.model.Role;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final EmailService emailService;
    private final SmsService smsService;

    public User registerUser(UserRegistrationRequest request){

        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(Role.ROLE_USER);
        user.setIsVerified(false);

        return userRepository.save(user);
    }

    public void initiateEmailVerification(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Otp otp = otpService.createOtp(user, OtpType.EMAIL_VERIFICATION);
        emailService.sendOtpEmail(user.getEmail(), otp.getCode());
    }


}
