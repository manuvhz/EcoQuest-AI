import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/challenge/:id
router.get('/challenge/:id', (req, res) => {
  const { id } = req.params;
  const challenge = db.challenges.find(c => c.id === id);
  if (challenge) {
    res.json(challenge);
  } else {
    res.status(404).json({ message: 'Challenge not found' });
  }
});

export default router;
