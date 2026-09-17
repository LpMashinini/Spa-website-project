package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String number);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String number);
}
