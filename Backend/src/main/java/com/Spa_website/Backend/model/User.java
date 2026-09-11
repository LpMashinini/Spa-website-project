package com.Spa_website.Backend.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_auth")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name", nullable = false, length = 255)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 255)
    private String lastName;

    @Column( name = "_email", nullable = false, length = 255)
    private String email;

    @Column(name = "_password", nullable = false, length = 255)
    private String password;

    @Column(name = "_confirm_password", nullable = false, length = 255)
    private String confirmPassword;

    @Column(name = "_role", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private Role role;
}
