import { Router } from 'express';
import { defaultUser } from '../models/userModel';

const router = Router();

// /api/login
router.post('/login', (req, res) => {
  // In a real app, you'd validate req.body.email and req.body.password
  // For this local server, we just return the default user
  console.log('Login attempt received:', req.body);
  res.json(defaultUser);
});

export default router;
