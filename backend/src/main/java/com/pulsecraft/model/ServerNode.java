package com.pulsecraft.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServerNode {
    private String id;
    private String name;
    private String region;
    private String ipAddress;
    private String status; // ONLINE, DEGRADED, OFFLINE
    private int pingMs;
    private double loadAverage;
    private String lastChecked;
}
