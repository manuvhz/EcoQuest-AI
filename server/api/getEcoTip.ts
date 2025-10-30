import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/ecotip/:id
router.get('/ecotip/:id', (req, res) => {
  const { id } = req.params;
  const ecoTip = db.ecoTips.find(t => t.id === id);
  if (ecoTip) {
    res.json(ecoTip);
  } else {
    res.status(404).json({ message: 'EcoTip not found' });
  }
});

export default router;
