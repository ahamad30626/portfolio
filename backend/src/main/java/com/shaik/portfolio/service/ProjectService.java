package com.shaik.portfolio.service;

import com.shaik.portfolio.model.Project;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ProjectService {

    public List<Project> getAllProjects() {
        return Arrays.asList(
            Project.builder()
                .id(1L)
                .title("NeuralChat AI")
                .description("An AI-powered chat application integrating OpenAI GPT-4, featuring real-time streaming responses, conversation history, and a sleek dark-mode UI built with React.")
                .imageUrl("/project1.png")
                .tags(Arrays.asList("React", "OpenAI API", "Node.js", "WebSockets"))
                .demoUrl("#")
                .githubUrl("#")
                .featured(true)
                .build(),

            Project.builder()
                .id(2L)
                .title("ShopVerse E-Commerce")
                .description("Full-stack e-commerce platform with cart management, Stripe payments, and an admin dashboard for inventory control.")
                .imageUrl("/project2.png")
                .tags(Arrays.asList("Next.js", "Stripe", "PostgreSQL", "Prisma"))
                .demoUrl("#")
                .githubUrl("#")
                .featured(true)
                .build(),

            Project.builder()
                .id(3L)
                .title("ConnectSphere Social")
                .description("A real-time social media app with live messaging, post feeds, story features, and full authentication via OAuth.")
                .imageUrl("/project3.png")
                .tags(Arrays.asList("React", "Socket.io", "MongoDB", "Redis"))
                .demoUrl("#")
                .githubUrl("#")
                .featured(true)
                .build(),

            Project.builder()
                .id(4L)
                .title("DevFlow CLI Tool")
                .description("A developer productivity CLI that scaffolds projects, manages git workflows, and integrates with GitHub API for streamlined development.")
                .imageUrl("")
                .tags(Arrays.asList("Node.js", "TypeScript", "GitHub API", "npm"))
                .demoUrl("#")
                .githubUrl("#")
                .featured(false)
                .build()
        );
    }

    public Project getProjectById(Long id) {
        return getAllProjects().stream()
            .filter(p -> p.getId().equals(id))
            .findFirst()
            .orElse(null);
    }
}
