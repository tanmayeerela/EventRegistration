package com.student.event.service;

import com.student.event.entity.User;
import com.student.event.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        // ✅ FIX: safe check (prevents 500 error)
        if (user.isPresent() && user.get().getPassword() != null
                && user.get().getPassword().equals(password)) {
            return user;
        }

        return Optional.empty();
    }
}