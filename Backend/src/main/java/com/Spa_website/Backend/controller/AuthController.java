package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.*;
import com.Spa_website.Backend.jwtAuth.JwtUtil;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request){

        User user = userService.registerUser(request);

        userService.initiateEmailVerification(user.getEmail());

        RegisterResponse response = new RegisterResponse(
                user.getId(),
                user.getEmail(),
                user.getIsVerified(),
                "User registered successfully. Verification OTP sent to email"
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthentication(@Valid @RequestBody AuthRequest request) throws Exception {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

        } catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        User user = userService.getUserByEmail(request.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getEmail(), user.getIsVerified()));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody OtpVerificationRequest request){

        boolean isValid = userService.verifyEmailOtp(request.getUserId(), request.getCode());

        if (isValid){
            return ResponseEntity.ok("email verified successfully");
        } else {
            return ResponseEntity.badRequest().body("invalid or expired OTP");
        }
    }

    @PostMapping("/resend-email-otp")
    public ResponseEntity<?> resendEmailOtp(@RequestBody EmailVerificationRequest request){

        userService.initiateEmailVerification(request.getEmail());

        return ResponseEntity.ok("OTP resent successfully");
    }

    @PostMapping("/verify-phone")
    public ResponseEntity<?> verifyPhone(@RequestBody OtpVerificationRequest request){

        boolean isValid = userService.verifyPhoneOtp(request.getUserId(), request.getCode());

        if (isValid){
            return ResponseEntity.ok("Phone verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
    }

    @PostMapping("/initiate-phone-verification")
    public ResponseEntity<?> initiatePhoneVerification(@RequestBody PhoneVerificationRequest request){

        userService.initiatePhoneVerification(request.getUserId());
        return ResponseEntity.ok("OTP sent to phone number");
    }
}
