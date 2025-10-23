import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/status
router.get('/status', (req, res) => {
  res.json({ message: "EcoQuest API funcionando 🌿" });
});

// App data routes
router.get('/challenges', (req, res) => res.json(db.challenges));
router.get('/leaderboard', (req, res) => res.json(db.leaderboardData));
router.get('/friends', (req, res) => res.json(db.friendsData));
router.get('/achievements', (req, res) => res.json(db.achievements));
router.get('/ecotips', (req, res) => res.json(db.ecoTips));

export default router;