package com.devpulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.devpulse.controller", "com.devpulse.service", "com.devpulse.config"})
public class DevPulseApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevPulseApplication.class, args);
    }
} 