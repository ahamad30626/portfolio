package com.shaik.portfolio.controller;

import com.shaik.portfolio.model.ContactMessage;
import com.shaik.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactService.save(message);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(Map.of(
                "success", true,
                "message", "Thank you " + saved.getName() + "! I'll get back to you within 24 hours.",
                "id", saved.getId()
            ));
    }

    @GetMapping
    public ResponseEntity<?> getMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
