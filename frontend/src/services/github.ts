import api from './api';

export interface GitHubProfile {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
}

export const githubService = {
    async getProfile(): Promise<GitHubProfile> {
        const response = await api.get<GitHubProfile>('/github/profile');
        return response.data;
    },

    async getRepositories(): Promise<GitHubRepo[]> {
        const response = await api.get<GitHubRepo[]>('/github/repos');
        return response.data;
    },

    async getContributions(): Promise<any[]> {
        const response = await api.get<any[]>('/github/contributions');
        return response.data;
    }
}; 