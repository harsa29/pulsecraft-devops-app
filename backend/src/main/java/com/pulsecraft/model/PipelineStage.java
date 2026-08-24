package com.pulsecraft.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PipelineStage {
    private String id;
    private String name;      // Git Push, Maven Test, Docker Build, SSH Deploy
    private String status;    // SUCCESS, RUNNING, PENDING, FAILED
    private int durationSec;
    private String logSnippet;
}
