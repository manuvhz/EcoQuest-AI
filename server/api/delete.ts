import { Router } from 'express';
import { db } from '../db';

const router = Router();

// /api/friends/:id
router.delete('/friends/:id', (req, res) => {
    const { id } = req.params;

    const friendIndex = db.friendsData.findIndex(f => f.id === id);
    if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found.' });
    }
    
    console.log(`Removing friend with id: ${id}`);
    
    // Remove from friends list
    db.friendsData.splice(friendIndex, 1);
    
    // Remove from user's friendIds
    const userFriendIndex = db.user.friendIds.indexOf(id);
    if (userFriendIndex > -1) {
        db.user.friendIds.splice(userFriendIndex, 1);
    }
    
    // Return updated user to sync client state
    res.json(db.user);
});

export default router;