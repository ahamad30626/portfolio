package com.shaik.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private List<String> tags;
    private String demoUrl;
    private String githubUrl;
    private boolean featured;
}
