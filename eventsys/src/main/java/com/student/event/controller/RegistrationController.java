package com.student.event.controller;

import com.student.event.entity.Registration;
import com.student.event.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/add")
    public ResponseEntity<?> register(@RequestBody Registration registration) {
    	try {
    		return ResponseEntity.ok(registrationService.register(registration));
    	}
    	catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }

    @GetMapping("/user/{userId}")
    public List<Registration> getUserEvents(@PathVariable Long userId) {
        return registrationService.getUserEvents(userId);
    }
    @GetMapping("/user/{userId}/details")
    public List<Registration> getByUser(@PathVariable Long userId) {
        return registrationService.getByUserId(userId);
    }
    @GetMapping("/all")
    public List<Registration> getAll() {
        return registrationService.getAll();
    }
}