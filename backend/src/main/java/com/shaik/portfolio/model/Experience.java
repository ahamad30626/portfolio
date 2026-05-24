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
public class Experience {
    private Long id;
    private String company;
    private String role;
    private String duration;
    private String startDate;
    private String endDate;
    private boolean current;
    private List<String> points;
}
