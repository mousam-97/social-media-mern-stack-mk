import { verifyToken } from "../middleware/auth.js";
import express from "express";
import { getFeedPosts, getUserPost, likePost } from '../controlers/posts.js';


const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPost);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;