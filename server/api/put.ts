import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/user
router.put('/user', (req, res) => {
    const { profile } = req.body;
    if (!profile || !profile.name) {
        return res.status(400).json({ message: 'Profile data is missing or invalid.' });
    }

    console.log('Updating user settings with:', profile);
    db.user.name = profile.name;
    // We can also update avatar if provided
    if(profile.avatarUrl) {
        db.user.avatarUrl = profile.avatarUrl;
    }

    res.json(db.user);
});

export default router;