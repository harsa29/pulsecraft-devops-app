package com.pulsecraft.service;

import com.pulsecraft.model.Incident;
import com.pulsecraft.repository.IncidentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository repository;

    public IncidentService(IncidentRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void seedInitialData() {
        if (repository.count() == 0) {
            Incident inc1 = new Incident(null, "JVM Garbage Collection Pause > 400ms", "pulsecraft-backend", "WARNING", "OPEN", "GC pause duration exceeded default latency SLA target of 200ms.", LocalDateTime.now().minusMinutes(42), null);
            Incident inc2 = new Incident(null, "Database Connection Pool Saturation", "postgresql-cluster", "CRITICAL", "IN_PROGRESS", "Active connections reached 98% of max_connections limit.", LocalDateTime.now().minusMinutes(15), null);
            Incident inc3 = new Incident(null, "Nginx SSL Certificate Auto-Renew Succeeded", "nginx-ingress", "INFO", "RESOLVED", "Certbot successfully renewed TLS certificate for target domain.", LocalDateTime.now().minusHours(3), LocalDateTime.now().minusHours(2));

            repository.saveAll(List.of(inc1, inc2, inc3));
        }
    }

    public List<Incident> getAllIncidents() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public Incident createIncident(Incident incident) {
        return repository.save(incident);
    }

    public Incident updateStatus(Long id, String newStatus) {
        Incident incident = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
        incident.setStatus(newStatus);
        if ("RESOLVED".equalsIgnoreCase(newStatus)) {
            incident.setResolvedAt(LocalDateTime.now());
        }
        return repository.save(incident);
    }

    public void deleteIncident(Long id) {
        repository.deleteById(id);
    }
}
