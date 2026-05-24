package com.shaik.portfolio.service;

import com.shaik.portfolio.model.SkillCategory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import static com.shaik.portfolio.model.SkillCategory.Skill;

@Service
public class SkillService {

    public List<SkillCategory> getAllSkillCategories() {
        return Arrays.asList(

            // ── Frontend ──────────────────────────────────────────────
            SkillCategory.builder()
                .category("Frontend")
                .icon("code")
                .skills(Arrays.asList(
                    Skill.builder().name("React").level(95).iconColor("#61DAFB").build(),
                    Skill.builder().name("Next.js").level(90).iconColor("#ffffff").build(),
                    Skill.builder().name("TypeScript").level(88).iconColor("#3178C6").build(),
                    Skill.builder().name("Tailwind CSS").level(92).iconColor("#06B6D4").build(),
                    Skill.builder().name("JavaScript").level(93).iconColor("#F7DF1E").build(),
                    Skill.builder().name("Framer Motion").level(80).iconColor("#ffffff").build()
                ))
                .build(),

            // ── Backend ───────────────────────────────────────────────
            SkillCategory.builder()
                .category("Backend")
                .icon("server")
                .skills(Arrays.asList(
                    Skill.builder().name("Node.js").level(87).iconColor("#5FA04E").build(),
                    Skill.builder().name("Spring Boot").level(82).iconColor("#6DB33F").build(),
                    Skill.builder().name("MongoDB").level(85).iconColor("#47A248").build(),
                    Skill.builder().name("PostgreSQL").level(78).iconColor("#4169E1").build(),
                    Skill.builder().name("Redis").level(75).iconColor("#DC382D").build(),
                    Skill.builder().name("GraphQL").level(76).iconColor("#E10098").build()
                ))
                .build(),

            // ── AI / ML ───────────────────────────────────────────────
            SkillCategory.builder()
                .category("AI / ML")
                .icon("brain")
                .skills(Arrays.asList(
                    Skill.builder().name("TensorFlow").level(70).iconColor("#FF6F00").build(),
                    Skill.builder().name("OpenAI API").level(85).iconColor("#ffffff").build(),
                    Skill.builder().name("LangChain").level(72).iconColor("#00A67E").build(),
                    Skill.builder().name("Hugging Face").level(68).iconColor("#FFD21E").build(),
                    Skill.builder().name("Scikit-learn").level(74).iconColor("#F89939").build(),
                    Skill.builder().name("Vector DB").level(66).iconColor("#8B5CF6").build()
                ))
                .build(),

            // ── Tools & DevOps ────────────────────────────────────────
            SkillCategory.builder()
                .category("Tools & DevOps")
                .icon("tools")
                .skills(Arrays.asList(
                    Skill.builder().name("Git").level(94).iconColor("#F05032").build(),
                    Skill.builder().name("Docker").level(80).iconColor("#2496ED").build(),
                    Skill.builder().name("AWS").level(73).iconColor("#FF9900").build(),
                    Skill.builder().name("Figma").level(88).iconColor("#F24E1E").build(),
                    Skill.builder().name("Linux").level(79).iconColor("#FCC624").build(),
                    Skill.builder().name("CI/CD").level(77).iconColor("#6366F1").build()
                ))
                .build()
        );
    }
}
