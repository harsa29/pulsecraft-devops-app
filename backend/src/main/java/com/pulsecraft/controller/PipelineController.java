package com.pulsecraft.controller;

import com.pulsecraft.model.PipelineStage;
import com.pulsecraft.service.PipelineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devops/pipeline")
public class PipelineController {

    private final PipelineService pipelineService;

    public PipelineController(PipelineService pipelineService) {
        this.pipelineService = pipelineService;
    }

    @GetMapping
    public ResponseEntity<List<PipelineStage>> getPipelineStatus() {
        return ResponseEntity.ok(pipelineService.getPipelineStatus());
    }
}
