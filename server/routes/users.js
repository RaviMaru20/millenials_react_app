import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateProfilePicture,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// USER ROUTES are only allowed to be accessed
// when a BEARER TOKEN is recieved from client side

/*********************** READ ***************************/
// "getUser" defined in "../controllers/auth.js"
router.get("/:id", verifyToken, getUser);
// "getUserFriends" defined in "../controllers/auth.js"
router.get("/:id/friends", verifyToken, getUserFriends);

/********************** UPDATE *************************/
// "addRemoveFriends" defined in "../controllers/auth.js"
router.patch("/:id/:friendid", verifyToken, addRemoveFriend);
router.patch("/:userId", verifyToken, updateProfilePicture);
export default router;

/* INFO */
/* 
router.get(path, middleware, callback function)
used to handle HTTP GET requests.

router.patch used to handle HTTP PATCH 
*/
