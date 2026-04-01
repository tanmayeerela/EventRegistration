package com.student.event.service;

import com.student.event.entity.Registration;
import com.student.event.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public Registration register(Registration registration) {

        // 🔴 CHECK DUPLICATE REGISTRATION
        List<Registration> existing = registrationRepository
                .findByUserId(registration.getUserId());

        for (Registration r : existing) {
            if (r.getEventId().equals(registration.getEventId())) {
                throw new RuntimeException("Already registered for this event");
            }
        }

        return registrationRepository.save(registration);
    }

    public List<Registration> getUserEvents(Long userId) {
        return registrationRepository.findByUserId(userId);
    }

    public List<Registration> getEventUsers(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }
    public List<Registration> getByUserId(Long userId) {
        return registrationRepository.findByUserId(userId);
    }
    public List<Registration> getAll() {
        return registrationRepository.findAll();
    }
}