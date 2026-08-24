package com.pulsecraft.service;

import com.pulsecraft.model.MetricPoint;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
public class TelemetryService {

    private final Queue<MetricPoint> history = new ConcurrentLinkedQueue<>();
    private final Random random = new Random();
    private boolean simulatedSpike = false;

    public TelemetryService() {
        // Pre-fill history with last 15 data points
        LocalTime now = LocalTime.now();
        for (int i = 14; i >= 0; i--) {
            LocalTime t = now.minusSeconds(i * 3L);
            history.add(generatePoint(t.format(DateTimeFormatter.ofPattern("HH:mm:ss"))));
        }
    }

    public List<MetricPoint> getHistory() {
        return new ArrayList<>(history);
    }

    public MetricPoint getLatestPoint() {
        String timestamp = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        MetricPoint point = generatePoint(timestamp);
        
        history.add(point);
        while (history.size() > 25) {
            history.poll();
        }
        return point;
    }

    public void triggerSpike() {
        this.simulatedSpike = true;
    }

    private MetricPoint generatePoint(String timestamp) {
        double cpu;
        double ram;
        double heap;
        int latency;
        int reqs;

        if (simulatedSpike) {
            cpu = 88.5 + random.nextDouble() * 9.5;
            ram = 82.0 + random.nextDouble() * 12.0;
            heap = 780 + random.nextInt(180);
            latency = 280 + random.nextInt(350);
            reqs = 1400 + random.nextInt(600);
            // Reset spike after generating
            if (random.nextDouble() > 0.4) {
                simulatedSpike = false;
            }
        } else {
            cpu = 18.0 + random.nextDouble() * 25.0;
            ram = 45.0 + random.nextDouble() * 15.0;
            heap = 320 + random.nextInt(120);
            latency = 12 + random.nextInt(45);
            reqs = 220 + random.nextInt(180);
        }

        String health = (cpu > 80 || ram > 85 || latency > 200) ? "DEGRADED" : "HEALTHY";
        int threads = 45 + random.nextInt(30);

        return new MetricPoint(
                timestamp,
                Math.round(cpu * 10.0) / 10.0,
                Math.round(ram * 10.0) / 10.0,
                Math.round(heap * 10.0) / 10.0,
                latency,
                reqs,
                threads,
                health
        );
    }
}
