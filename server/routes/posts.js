import express from "express";
import {
  commentPost,
  deletePost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// All callbacks are defined in "../controllers/*"

/********************* READ **********************/
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/******************** UPDATE *********************/
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);
router.delete("/:id/post", verifyToken, deletePost);

export default router;
