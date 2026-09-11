package com.Spa_website.Backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_auth")
public class User {

    @Id
    private long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;
    private Role role;
}
