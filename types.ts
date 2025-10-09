import type { Component } from 'vue';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Changed from JSX.Element to string for v-html
  goal?: number; // Optional total for progress-based achievements
}

export interface User {
  id:string;
  name: string;
  avatarUrl: string;
  points: number;
  level: number;
  pointsToNextLevel: number;
  unlockedAchievements: string[]; // array of achievement ids
  completedChallenges: string[]; // array of challenge ids
  friendIds: string[];
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'quiz' | 'game' | 'simulation';
  icon: string; // Changed from JSX.Element to a component name string
  questions?: Question[];
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  points: number;
}

export interface Friend extends Omit<LeaderboardUser, 'rank'> {
  isOnline: boolean;
  lastActivity: string;
}

export interface EcoTip {
    id: string;
    title: string;
    category: 'Recycling' | 'Energy' | 'Water' | 'Lifestyle';
    content: string;
    icon: string; // emoji
}
