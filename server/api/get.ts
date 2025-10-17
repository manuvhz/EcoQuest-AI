import { Router } from 'express';
import { users } from '../models/userModel';
import { achievements } from '../models/achievementModel';
import { challenges } from '../models/challengeModel';
import { ecoTips } from '../models/ecoTipModel';
import { friendsData } from '../models/friendModel';
import { leaderboardData } from '../models/leaderboardModel';

const router = Router();

// /api/status
router.get('/status', (req, res) => {
  res.json({ message: "EcoQuest API funcionando 🌿" });
});

// /api/users
router.get('/users', (req, res) => {
  res.json(users);
});

// App data routes
router.get('/challenges', (req, res) => res.json(challenges));
router.get('/leaderboard', (req, res) => res.json(leaderboardData));
router.get('/friends', (req, res) => res.json(friendsData));
router.get('/achievements', (req, res) => res.json(achievements));
router.get('/ecotips', (req, res) => res.json(ecoTips));

export default router;
