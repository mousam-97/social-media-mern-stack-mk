import { verifyToken } from "../middleware/auth.js";
import express from "express";
import { getUserFriends, addRemoveFriend, getUser } from '../controlers/users.js';


const router = express.Router();

// READ
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);


// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;