package com.pulsecraft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PulseCraftApplication {

    public static void main(String[] args) {
        SpringApplication.run(PulseCraftApplication.class, args);
    }
}
