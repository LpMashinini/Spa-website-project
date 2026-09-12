package com.Spa_website.Backend.repository;

import com.Spa_website.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
