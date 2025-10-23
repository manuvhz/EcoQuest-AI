import { Router } from 'express';
import { db, resetDatabase } from '../db';

const router = Router();

// /api/login
router.post('/login', (req, res) => {
  // Reset the database to simulate a new session
  resetDatabase();
  console.log('Login attempt received, user data reset.');
  res.json(db.user);
});

// /api/user/challenge
router.post('/user/challenge', (req, res) => {
    const { challengeId, points } = req.body;

    if (!challengeId || points === undefined) {
        return res.status(400).json({ message: 'Challenge ID and points are required.' });
    }

    if (db.user.completedChallenges.includes(challengeId)) {
        // Return current state without erroring, as the frontend might re-request.
        console.warn(`Attempted to complete already completed challenge: ${challengeId}`);
        return res.json({ user: db.user, notifications: [] });
    }

    console.log(`Completing challenge ${challengeId} for ${points} points.`);

    const notifications: string[] = [];

    // Update user state
    db.user.completedChallenges.push(challengeId);
    db.user.points += points;
    

    // Check for level up
    let leveledUp = false;
    if (db.user.points >= db.user.pointsToNextLevel) {
        db.user.level++;
        db.user.pointsToNextLevel = Math.floor(db.user.pointsToNextLevel * 1.5);
        notifications.push(`¡Felicidades! ¡Has subido al Nivel ${db.user.level}!`);
        leveledUp = true;
    }

    if(!leveledUp) {
        notifications.push(`¡Reto completado! Has ganado ${points} puntos.`);
    }

    // Check for achievements
    const challengeChampionAchievementId = 'a6'; // 'Completa 10 retos.'
    if (db.user.completedChallenges.length >= 10 && !db.user.unlockedAchievements.includes(challengeChampionAchievementId)) {
        db.user.unlockedAchievements.push(challengeChampionAchievementId);
        notifications.push('¡Logro desbloqueado: Campeón de Retos! 🏆');
    }
    
    // Add more achievement checks here if needed...

    res.json({ user: db.user, notifications });
});

export default router;