import api from './api';
import { DevPulseAnalysis, DevPulseReport, DevPulseTrend, DevPulseRecommendation } from '@/types/devpulse';

export const devPulseService = {
  async analyzeUser(username: string): Promise<DevPulseAnalysis> {
    const response = await api.get(`/api/analyze/${username}`);
    return response.data;
  },

  async getUserReport(username: string): Promise<DevPulseReport> {
    const response = await api.get(`/api/report/${username}`);
    return response.data;
  },

  async getUserRecommendations(username: string): Promise<DevPulseRecommendation> {
    const response = await api.get(`/api/recommendations/${username}`);
    return response.data;
  },

  async getUserTrends(username: string): Promise<DevPulseTrend> {
    const response = await api.get(`/api/trends/${username}`);
    return response.data;
  },
};
