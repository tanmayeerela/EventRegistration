package com.student.event.controller;

import com.student.event.entity.Event;
import com.student.event.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public Event addEvent(@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    @GetMapping("/{id}")
    public Optional<Event> getEvent(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
}