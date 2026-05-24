package com.shaik.portfolio.controller;

import com.shaik.portfolio.model.SkillCategory;
import com.shaik.portfolio.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillCategory>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkillCategories());
    }
}
