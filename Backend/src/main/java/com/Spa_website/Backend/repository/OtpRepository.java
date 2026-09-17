package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.Otp;
import com.Spa_website.Backend.model.OtpType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findByCodeAndUser_IdAndTypeAndVerifiedIsFalseAndExpiresAtAfter(
            String code, Long userId, OtpType type, LocalDateTime now);
    List<Otp> findByUser_IdAndVerifiedIsFalseAndExpiresAtBefore(Long userid, LocalDateTime now);
}
