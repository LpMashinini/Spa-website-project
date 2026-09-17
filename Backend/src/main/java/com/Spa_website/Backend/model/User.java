package com.Spa_website.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "user_auth")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "_first_name", nullable = false, length = 255)
    private String firstName;

    @Column(name = "_last_name", nullable = false, length = 255)
    private String lastName;

    @Column( name = "_email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "_password", nullable = false, length = 255)
    private String password;

    @Column(name = "_confirm_password", nullable = false, length = 255)
    private String confirmPassword;

    @Column(name = " is_verified", nullable = false)
    private Boolean isVerified= false;

    @Column(name = "_role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Opt> opt = new ArrayList<>();

}
