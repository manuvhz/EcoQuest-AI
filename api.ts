// api.ts
// This file makes network requests to the local backend server.

import type { User, Challenge, LeaderboardUser, Friend, Achievement, EcoTip } from './types.ts';

const API_BASE_URL = 'http://localhost:3001/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

export const api = {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse<User>(response);
  },

  async saveSettings(settingsData: { profile: { name: string; avatarUrl: string }; notifications: any }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
    });
    return handleResponse<User>(response);
  },

  async removeFriend(friendId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/friends/${friendId}`, {
        method: 'DELETE',
    });
    return handleResponse<User>(response);
  },

  async completeChallenge(challengeData: { challengeId: string; points: number }): Promise<{ user: User, notifications: string[] }> {
    const response = await fetch(`${API_BASE_URL}/user/challenge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
    });
    return handleResponse<{ user: User, notifications: string[] }>(response);
  },

  async getChallenges(): Promise<Challenge[]> {
    const response = await fetch(`${API_BASE_URL}/challenges`);
    return handleResponse<Challenge[]>(response);
  },
  
  async getLeaderboard(): Promise<LeaderboardUser[]> {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    return handleResponse<LeaderboardUser[]>(response);
  },

  async getFriends(): Promise<Friend[]> {
    const response = await fetch(`${API_BASE_URL}/friends`);
    return handleResponse<Friend[]>(response);
  },

  async getAchievements(): Promise<Achievement[]> {
    const response = await fetch(`${API_BASE_URL}/achievements`);
    return handleResponse<Achievement[]>(response);
  },
  
  async getEcoTips(): Promise<EcoTip[]> {
    const response = await fetch(`${API_BASE_URL}/ecotips`);
    return handleResponse<EcoTip[]>(response);
  }
};