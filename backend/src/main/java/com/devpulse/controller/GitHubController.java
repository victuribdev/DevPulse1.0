package com.devpulse.controller;

import com.devpulse.service.GitHubService;
import com.devpulse.config.GitHubConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService githubService;
    private final GitHubConfig githubConfig;

    @Autowired
    public GitHubController(GitHubService githubService, GitHubConfig githubConfig) {
        this.githubService = githubService;
        this.githubConfig = githubConfig;
    }

    @GetMapping("/repos")
    public ResponseEntity<List<Map<String, Object>>> getUserRepositories() {
        return ResponseEntity.ok(githubService.getUserRepositories(githubConfig.getGithubUsername()));
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile() {
        return ResponseEntity.ok(githubService.getUserProfile(githubConfig.getGithubUsername()));
    }

    @GetMapping("/contributions")
    public ResponseEntity<List<Map<String, Object>>> getUserContributions() {
        return ResponseEntity.ok(githubService.getUserContributions(githubConfig.getGithubUsername()));
    }
} 