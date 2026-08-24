package com.pulsecraft.controller;

import com.pulsecraft.model.MetricPoint;
import com.pulsecraft.service.TelemetryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/metrics")
public class TelemetryController {

    private final TelemetryService telemetryService;

    public TelemetryController(TelemetryService telemetryService) {
        this.telemetryService = telemetryService;
    }

    @GetMapping("/history")
    public ResponseEntity<List<MetricPoint>> getHistory() {
        return ResponseEntity.ok(telemetryService.getHistory());
    }

    @GetMapping("/live")
    public ResponseEntity<MetricPoint> getLiveMetric() {
        return ResponseEntity.ok(telemetryService.getLatestPoint());
    }

    @PostMapping("/trigger-spike")
    public ResponseEntity<Map<String, String>> triggerSpike() {
        telemetryService.triggerSpike();
        return ResponseEntity.ok(Map.of("message", "Simulated CPU/RAM spike triggered successfully!"));
    }
}
