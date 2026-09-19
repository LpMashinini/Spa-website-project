package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.AuthRequest;
import com.Spa_website.Backend.dto.AuthResponse;
import com.Spa_website.Backend.dto.OtpVerificationRequest;
import com.Spa_website.Backend.dto.UserRegistrationRequest;
import com.Spa_website.Backend.jwtAuth.JwtUtil;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.service.UserService;
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
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request){

        User user = userService.registerUser(request);

        userService.initiateEmailVerification(user.getEmail());

        return ResponseEntity.ok("User registered successfully. Verification OTP sent to email");
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthentication(@RequestBody AuthRequest request) throws Exception {

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
    public ResponseEntity<?> resendEmailOtp(@RequestBody String email){
        userService.initiateEmailVerification(email);
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

    @PostMapping("/initiate-verification")
    public ResponseEntity<?> initiatePhoneVerification(@RequestBody Long userId){

        userService.initiatePhoneVerification(userId);
        return ResponseEntity.ok("OTP sent to phone number");
    }
}
