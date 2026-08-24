package com.pulsecraft.controller;

import com.pulsecraft.model.ServerNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1/nodes")
public class NodeController {

    @GetMapping
    public ResponseEntity<List<ServerNode>> getNodes() {
        String now = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        List<ServerNode> nodes = List.of(
                new ServerNode("node-us-east", "US-East (N. Virginia)", "us-east-1", "54.210.12.89", "ONLINE", 14, 0.42, now),
                new ServerNode("node-eu-west", "EU-Central (Frankfurt)", "eu-central-1", "35.158.44.102", "ONLINE", 38, 0.65, now),
                new ServerNode("node-ap-south", "AP-South (Mumbai)", "ap-south-1", "13.127.90.14", "ONLINE", 22, 0.38, now),
                new ServerNode("node-ap-east", "AP-Northeast (Tokyo)", "ap-northeast-1", "18.179.22.50", "DEGRADED", 145, 1.85, now)
        );
        return ResponseEntity.ok(nodes);
    }
}
