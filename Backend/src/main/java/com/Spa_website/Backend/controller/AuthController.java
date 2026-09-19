package com.Spa_website.Backend.controller;

import com.Spa_website.Backend.dto.UserRegistrationRequest;
import com.Spa_website.Backend.jwtAuth.JwtUtil;
import com.Spa_website.Backend.model.User;
import com.Spa_website.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
}
