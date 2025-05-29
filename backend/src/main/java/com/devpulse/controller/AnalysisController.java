package com.devpulse.controller;

import com.devpulse.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Set;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8081", "http://localhost:8082"})
public class AnalysisController {
    private static final Logger logger = LoggerFactory.getLogger(AnalysisController.class);

    private final GitHubService githubService;

    @Autowired
    public AnalysisController(GitHubService githubService) {
        this.githubService = githubService;
        logger.info("AnalysisController initialized");
    }

    @GetMapping("/analyze/{username}")
    public ResponseEntity<Map<String, Object>> analyzeUser(@PathVariable String username) {
        logger.info("Received request to analyze user: {}", username);
        try {
            List<Map<String, Object>> contributions = githubService.getUserContributions(username);
            logger.info("Contributions received: {}", contributions.size());
            
            if (!contributions.isEmpty()) {
                logger.info("First event type: {}", contributions.get(0).get("type"));
                logger.info("First event created_at: {}", contributions.get(0).get("created_at"));
            }

            Map<String, Object> analysis = new HashMap<>();
            analysis.put("username", username);
            analysis.put("averageCommitsPerDay", calculateAverageCommits(contributions));
            analysis.put("lateNightCommits", calculateLateNightCommits(contributions));
            analysis.put("weekendCommitRatio", calculateWeekendRatio(contributions));
            analysis.put("consecutiveDays", calculateConsecutiveDays(contributions));
            analysis.put("idleDays", calculateIdleDays(contributions));
            analysis.put("suspectWords", new String[]{});
            analysis.put("trend", calculateTrend(contributions));
            analysis.put("recommendationScore", calculateRecommendationScore(contributions));
            analysis.put("advice", generateAdvice(contributions));
            
            // New metrics
            analysis.put("commitFrequency", calculateCommitFrequency(contributions));
            analysis.put("workLifeBalance", calculateWorkLifeBalance(contributions));
            analysis.put("productivityScore", calculateProductivityScore(contributions));
            analysis.put("commitPatterns", analyzeCommitPatterns(contributions));
            analysis.put("activityHours", calculateActivityHours(contributions));
            analysis.put("projectDiversity", calculateProjectDiversity(contributions));

            logger.info("Analysis completed for user: {}", username);
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            logger.error("Error analyzing user {}: {}", username, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/report/{username}")
    public ResponseEntity<Map<String, Object>> getUserReport(@PathVariable String username) {
        logger.info("Received request for report of user: {}", username);
        try {
            List<Map<String, Object>> repos = githubService.getUserRepositories(username);
            List<Map<String, Object>> contributions = githubService.getUserContributions(username);

            Map<String, Object> report = new HashMap<>();
            report.put("username", username);
            report.put("totalCommits", calculateTotalCommits(contributions));
            report.put("totalRepositories", repos.size());
            report.put("averageCommitsPerRepo", calculateAverageCommitsPerRepo(contributions, repos.size()));
            report.put("analysisDate", LocalDateTime.now().toString());

            logger.info("Report generated for user: {}", username);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            logger.error("Error generating report for user {}: {}", username, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    private double calculateAverageCommits(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0.0;
        
        long commitCount = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                logger.debug("Event type: {}", type);
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .count();
            
        logger.info("Total commit count: {}", commitCount);
        return commitCount / 30.0;
    }

    private int calculateLateNightCommits(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0;
        
        return (int) contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .filter(event -> {
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, 
                    DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 22 || hour < 6;
            })
            .count();
    }

    private double calculateWeekendRatio(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0.0;
        
        long totalCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .count();
            
        if (totalCommits == 0) return 0.0;
        
        long weekendCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .filter(event -> {
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, 
                    DateTimeFormatter.ISO_DATE_TIME);
                int dayOfWeek = commitTime.getDayOfWeek().getValue();
                return dayOfWeek == 6 || dayOfWeek == 7;
            })
            .count();
            
        return (weekendCommits * 100.0) / totalCommits;
    }

    private int calculateConsecutiveDays(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0;
        
        List<LocalDateTime> commitDates = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .map(event -> LocalDateTime.parse((String) event.get("created_at"), 
                DateTimeFormatter.ISO_DATE_TIME))
            .sorted()
            .collect(Collectors.toList());
            
        if (commitDates.isEmpty()) return 0;
        
        int maxConsecutive = 1;
        int currentConsecutive = 1;
        LocalDateTime lastDate = commitDates.get(0);
        
        for (int i = 1; i < commitDates.size(); i++) {
            LocalDateTime currentDate = commitDates.get(i);
            if (lastDate.plusDays(1).toLocalDate().equals(currentDate.toLocalDate())) {
                currentConsecutive++;
                maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
            } else {
                currentConsecutive = 1;
            }
            lastDate = currentDate;
        }
        
        return maxConsecutive;
    }

    private int calculateIdleDays(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0;
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime lastCommit = contributions.stream()
            .filter(event -> "PushEvent".equals(event.get("type")))
            .map(event -> LocalDateTime.parse((String) event.get("created_at"), 
                DateTimeFormatter.ISO_DATE_TIME))
            .max(LocalDateTime::compareTo)
            .orElse(now);
            
        return (int) (now.toEpochSecond(ZoneOffset.UTC) - lastCommit.toEpochSecond(ZoneOffset.UTC)) / (24 * 3600);
    }

    private int calculateTotalCommits(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0;
        
        return (int) contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .count();
    }

    private double calculateAverageCommitsPerRepo(List<Map<String, Object>> contributions, int repoCount) {
        if (repoCount == 0) return 0.0;
        return calculateTotalCommits(contributions) / (double) repoCount;
    }

    private String calculateTrend(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return "indeterminado";
        
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        
        long recentCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                return "PushEvent".equals(type) || "CreateEvent".equals(type) || "CommitCommentEvent".equals(type);
            })
            .filter(event -> {
                LocalDateTime commitTime = LocalDateTime.parse((String) event.get("created_at"), 
                    DateTimeFormatter.ISO_DATE_TIME);
                return commitTime.isAfter(thirtyDaysAgo);
            })
            .count();
            
        if (recentCommits > 20) return "positivo";
        if (recentCommits > 10) return "estável";
        return "negativo";
    }

    private int calculateRecommendationScore(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0;
        
        int score = 0;
        
        // Pontuação baseada na média de commits
        double avgCommits = calculateAverageCommits(contributions);
        if (avgCommits > 3) score += 30;
        else if (avgCommits > 1) score += 20;
        else if (avgCommits > 0.5) score += 10;
        
        // Pontuação baseada em commits noturnos
        int lateNightCommits = calculateLateNightCommits(contributions);
        if (lateNightCommits < 5) score += 20;
        else if (lateNightCommits < 10) score += 10;
        
        // Pontuação baseada em commits de fim de semana
        double weekendRatio = calculateWeekendRatio(contributions);
        if (weekendRatio < 20) score += 20;
        else if (weekendRatio < 40) score += 10;
        
        // Pontuação baseada em dias consecutivos
        int consecutiveDays = calculateConsecutiveDays(contributions);
        if (consecutiveDays > 7) score += 30;
        else if (consecutiveDays > 3) score += 20;
        else if (consecutiveDays > 1) score += 10;
        
        return score;
    }

    private String generateAdvice(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) 
            return "Nenhum dado disponível para análise.";
            
        StringBuilder advice = new StringBuilder();
        
        double avgCommits = calculateAverageCommits(contributions);
        if (avgCommits < 0.5) {
            advice.append("Tente aumentar sua frequência de commits. ");
        }
        
        int lateNightCommits = calculateLateNightCommits(contributions);
        if (lateNightCommits > 10) {
            advice.append("Considere reduzir commits noturnos para melhorar seu bem-estar. ");
        }
        
        double weekendRatio = calculateWeekendRatio(contributions);
        if (weekendRatio > 40) {
            advice.append("Muitos commits nos fins de semana podem indicar sobrecarga. ");
        }
        
        int idleDays = calculateIdleDays(contributions);
        if (idleDays > 7) {
            advice.append("Considere manter um ritmo mais constante de desenvolvimento. ");
        }
        
        return advice.length() > 0 ? advice.toString() : "Continue mantendo um bom ritmo de desenvolvimento!";
    }

    private Map<String, Object> calculateCommitFrequency(List<Map<String, Object>> contributions) {
        Map<String, Object> frequency = new HashMap<>();
        if (contributions == null || contributions.isEmpty()) {
            frequency.put("daily", 0);
            frequency.put("weekly", 0);
            frequency.put("monthly", 0);
            return frequency;
        }

        long dailyCommits = contributions.stream()
            .filter(event -> "PushEvent".equals(event.get("type")))
            .count();

        frequency.put("daily", dailyCommits / 30.0);
        frequency.put("weekly", dailyCommits / 4.0);
        frequency.put("monthly", dailyCommits);
        
        return frequency;
    }

    private double calculateWorkLifeBalance(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0.0;
        
        long totalCommits = contributions.stream()
            .filter(event -> "PushEvent".equals(event.get("type")))
            .count();
            
        if (totalCommits == 0) return 0.0;
        
        long weekendCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int dayOfWeek = commitTime.getDayOfWeek().getValue();
                return dayOfWeek == 6 || dayOfWeek == 7;
            })
            .count();
            
        long lateNightCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 22 || hour < 6;
            })
            .count();
            
        double weekendRatio = (weekendCommits * 100.0) / totalCommits;
        double lateNightRatio = (lateNightCommits * 100.0) / totalCommits;
        
        // Score calculation: 100 - (weekendRatio + lateNightRatio) / 2
        return Math.max(0, 100 - (weekendRatio + lateNightRatio) / 2);
    }

    private double calculateProductivityScore(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0.0;
        
        double avgCommits = calculateAverageCommits(contributions);
        int consecutiveDays = calculateConsecutiveDays(contributions);
        double workLifeBalance = calculateWorkLifeBalance(contributions);
        
        // Weighted scoring
        double commitScore = Math.min(avgCommits * 10, 40); // Max 40 points
        double consistencyScore = Math.min(consecutiveDays * 2, 30); // Max 30 points
        double balanceScore = workLifeBalance * 0.3; // Max 30 points
        
        return commitScore + consistencyScore + balanceScore;
    }

    private Map<String, Object> analyzeCommitPatterns(List<Map<String, Object>> contributions) {
        Map<String, Object> patterns = new HashMap<>();
        if (contributions == null || contributions.isEmpty()) {
            patterns.put("morning", 0);
            patterns.put("afternoon", 0);
            patterns.put("evening", 0);
            patterns.put("night", 0);
            return patterns;
        }

        long totalCommits = contributions.stream()
            .filter(event -> "PushEvent".equals(event.get("type")))
            .count();
            
        if (totalCommits == 0) {
            patterns.put("morning", 0);
            patterns.put("afternoon", 0);
            patterns.put("evening", 0);
            patterns.put("night", 0);
            return patterns;
        }

        long morningCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 6 && hour < 12;
            })
            .count();

        long afternoonCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 12 && hour < 18;
            })
            .count();

        long eveningCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 18 && hour < 22;
            })
            .count();

        long nightCommits = contributions.stream()
            .filter(event -> {
                String type = (String) event.get("type");
                if (!"PushEvent".equals(type)) return false;
                
                String createdAt = (String) event.get("created_at");
                if (createdAt == null) return false;
                
                LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                int hour = commitTime.getHour();
                return hour >= 22 || hour < 6;
            })
            .count();

        patterns.put("morning", (morningCommits * 100.0) / totalCommits);
        patterns.put("afternoon", (afternoonCommits * 100.0) / totalCommits);
        patterns.put("evening", (eveningCommits * 100.0) / totalCommits);
        patterns.put("night", (nightCommits * 100.0) / totalCommits);
        
        return patterns;
    }

    private Map<String, Integer> calculateActivityHours(List<Map<String, Object>> contributions) {
        Map<String, Integer> activityHours = new HashMap<>();
        if (contributions == null || contributions.isEmpty()) {
            for (int i = 0; i < 24; i++) {
                activityHours.put(String.format("%02d:00", i), 0);
            }
            return activityHours;
        }

        for (int i = 0; i < 24; i++) {
            final int hour = i;
            long commitsInHour = contributions.stream()
                .filter(event -> {
                    String type = (String) event.get("type");
                    if (!"PushEvent".equals(type)) return false;
                    
                    String createdAt = (String) event.get("created_at");
                    if (createdAt == null) return false;
                    
                    LocalDateTime commitTime = LocalDateTime.parse(createdAt, DateTimeFormatter.ISO_DATE_TIME);
                    return commitTime.getHour() == hour;
                })
                .count();
                
            activityHours.put(String.format("%02d:00", i), (int) commitsInHour);
        }
        
        return activityHours;
    }

    private double calculateProjectDiversity(List<Map<String, Object>> contributions) {
        if (contributions == null || contributions.isEmpty()) return 0.0;
        
        Set<String> uniqueRepos = contributions.stream()
            .filter(event -> "PushEvent".equals(event.get("type")))
            .map(event -> {
                Map<String, Object> repo = (Map<String, Object>) event.get("repo");
                return repo != null ? (String) repo.get("name") : null;
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
            
        return uniqueRepos.size();
    }
} 