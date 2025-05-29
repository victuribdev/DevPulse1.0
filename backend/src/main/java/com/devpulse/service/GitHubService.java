package com.devpulse.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import java.util.Map;
import java.util.List;

@Service
public class GitHubService {

    private final RestTemplate githubRestTemplate;
    private static final String GITHUB_API_BASE_URL = "https://api.github.com";

    @Autowired
    public GitHubService(RestTemplate githubRestTemplate) {
        this.githubRestTemplate = githubRestTemplate;
    }

    public List<Map<String, Object>> getUserRepositories(String username) {
        String url = GITHUB_API_BASE_URL + "/users/" + username + "/repos";
        return githubRestTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        ).getBody();
    }

    public Map<String, Object> getUserProfile(String username) {
        String url = GITHUB_API_BASE_URL + "/users/" + username;
        return githubRestTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        ).getBody();
    }

    public List<Map<String, Object>> getUserContributions(String username) {
        String url = GITHUB_API_BASE_URL + "/users/" + username + "/events";
        return githubRestTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        ).getBody();
    }
} 