package com.pulsecraft.service;

import com.pulsecraft.model.PipelineStage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PipelineService {

    public List<PipelineStage> getPipelineStatus() {
        List<PipelineStage> stages = new ArrayList<>();
        stages.add(new PipelineStage("1", "Git Push & Triggers", "SUCCESS", 4, "commit: feat(devops): update Dockerfile & SSL certbot script. Ref: main@a8f3b9e"));
        stages.add(new PipelineStage("2", "Spring Boot Build & Unit Tests", "SUCCESS", 28, "Maven test suite executed 14 tests: 0 failures, 0 errors. Package: pulsecraft-backend-1.0.0.jar"));
        stages.add(new PipelineStage("3", "React Vite Frontend Build", "SUCCESS", 18, "vite v5.1.0 building for production... dist/ index.html 0.45 kB, assets/ 142.80 kB."));
        stages.add(new PipelineStage("4", "Docker Multi-Stage Build & Push", "SUCCESS", 45, "Successfully built img: pulsecraft/backend:latest & pulsecraft/frontend:latest. Pushed to registry."));
        stages.add(new PipelineStage("5", "SSH Deploy & Nginx Live Swap", "SUCCESS", 12, "Connected to VPS via SSH. Executed docker compose up -d --remove-orphans. Health check: 200 OK."));
        return stages;
    }
}
