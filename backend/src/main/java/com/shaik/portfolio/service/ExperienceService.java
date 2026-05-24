package com.shaik.portfolio.service;

import com.shaik.portfolio.model.Experience;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ExperienceService {

    public List<Experience> getAllExperience() {
        return Arrays.asList(

            Experience.builder()
                .id(1L)
                .company("TechNova Inc.")
                .role("Senior Frontend Developer")
                .duration("Jan 2024 — Present")
                .startDate("Jan 2024")
                .endDate("Present")
                .current(true)
                .points(Arrays.asList(
                    "Led the redesign of the core product UI, reducing churn by 22%",
                    "Built a reusable component library adopted by 4 engineering teams",
                    "Mentored 3 junior developers and ran weekly code review sessions"
                ))
                .build(),

            Experience.builder()
                .id(2L)
                .company("Pixels Studio")
                .role("Frontend Developer")
                .duration("Jun 2022 — Dec 2023")
                .startDate("Jun 2022")
                .endDate("Dec 2023")
                .current(false)
                .points(Arrays.asList(
                    "Developed 12+ client-facing React apps with 99.9% uptime",
                    "Integrated REST and GraphQL APIs, improving load time by 40%",
                    "Collaborated closely with UX designers on design system creation"
                ))
                .build(),

            Experience.builder()
                .id(3L)
                .company("Startup Labs")
                .role("Junior Web Developer")
                .duration("Aug 2021 — May 2022")
                .startDate("Aug 2021")
                .endDate("May 2022")
                .current(false)
                .points(Arrays.asList(
                    "Built responsive landing pages and marketing sites from Figma designs",
                    "Contributed to an internal CMS tool using Vue.js and Firebase",
                    "Improved site performance scores from 58 to 94 on Lighthouse"
                ))
                .build()
        );
    }
}
