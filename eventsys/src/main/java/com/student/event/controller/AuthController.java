package com.student.event.controller;

import com.student.event.entity.User;
import com.student.event.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return userService.login(user.getEmail(), user.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}