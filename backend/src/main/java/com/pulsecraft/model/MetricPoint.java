package com.pulsecraft.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetricPoint {
    private String timestamp;
    private double cpuUsage;
    private double ramUsage;
    private double jvmHeapUsage;
    private int latencyMs;
    private int requestsPerSec;
    private int activeThreads;
    private String healthStatus;
}
