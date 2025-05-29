package com.devpulse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.context.annotation.Bean;

@Configuration
public class GitHubConfig {

    @Value("${github.token}")
    private String githubToken;

    @Value("${github.username}")
    private String githubUsername;

    @Bean
    public RestTemplate githubRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().set(HttpHeaders.AUTHORIZATION, "Bearer " + githubToken);
            request.getHeaders().set(HttpHeaders.ACCEPT, "application/vnd.github.v3+json");
            return execution.execute(request, body);
        });
        return restTemplate;
    }

    public String getGithubUsername() {
        return githubUsername;
    }
} 