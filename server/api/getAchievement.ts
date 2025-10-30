import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/achievement/:id
router.get('/achievement/:id', (req, res) => {
  const { id } = req.params;
  const achievement = db.achievements.find(a => a.id === id);
  if (achievement) {
    res.json(achievement);
  } else {
    res.status(404).json({ message: 'Achievement not found' });
  }
});

export default router;
