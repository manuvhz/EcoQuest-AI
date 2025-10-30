import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/user/:id
router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  // Combine all known users to find the profile
  const allUsers = [db.user, ...db.leaderboardData];
  const userProfile = allUsers.find(u => u.id === id);
  
  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
