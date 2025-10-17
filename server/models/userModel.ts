// This file matches the structure requested in the prompt.
// The main user object for the login functionality is also defined here.
import type { User as AppUser } from '../../types';

// Simple user model as requested
export interface User {
  id: number;
  name: string;
  email: string;
  level: number;
  points: number;
}

export const users: User[] = [
  { id: 1, name: 'Ana', email: 'ana@ecoquest.com', level: 5, points: 1200 },
  { id: 2, name: 'Carlos', email: 'carlos@ecoquest.com', level: 3, points: 600 },
];

// Full user object needed for the application's functionality
export const defaultUser: AppUser = {
  id: 'u1',
  name: 'EcoGuerrero',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
  points: 10500,
  level: 12,
  pointsToNextLevel: 15000,
  unlockedAchievements: ['a1', 'a2', 'a4', 'a5'],
  completedChallenges: ['c1'],
  friendIds: ['u2', 'u3', 'u4'],
};
