package com.shaik.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillCategory {
    private String category;       // e.g. "Frontend"
    private String icon;           // category icon label
    private List<Skill> skills;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Skill {
        private String name;
        private int level;         // 0–100 percentage
        private String iconColor;  // hex color for the icon ring
    }
}
