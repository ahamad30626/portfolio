package com.shaik.portfolio.controller;

import com.shaik.portfolio.model.Experience;
import com.shaik.portfolio.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperience() {
        return ResponseEntity.ok(experienceService.getAllExperience());
    }
}
