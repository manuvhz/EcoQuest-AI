import { defaultUser as initialUser } from './models/userModel';
import { achievements } from './models/achievementModel';
import { challenges } from './models/challengeModel';
import { ecoTips } from './models/ecoTipModel';
import { friendsData as initialFriendsData } from './models/friendModel';
import { leaderboardData } from './models/leaderboardModel';
import type { User, Achievement, Challenge, EcoTip, Friend, LeaderboardUser } from '../types';

// Deep copy function to avoid mutations of the original models
const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

interface Db {
    user: User;
    achievements: Achievement[];
    challenges: Challenge[];
    ecoTips: EcoTip[];
    friendsData: Friend[];
    leaderboardData: LeaderboardUser[];
}

// In-memory database
export const db: Db = {
    user: deepCopy(initialUser),
    achievements: deepCopy(achievements),
    challenges: deepCopy(challenges),
    ecoTips: deepCopy(ecoTips),
    friendsData: deepCopy(initialFriendsData),
    leaderboardData: deepCopy(leaderboardData),
};

// Function to reset the database state, useful for new login sessions
export const resetDatabase = () => {
    db.user = deepCopy(initialUser);
    db.friendsData = deepCopy(initialFriendsData);
    console.log('Database has been reset to its initial state.');
};