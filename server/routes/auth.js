import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// "login" defined in "../controllers/auth.js"
// router.post handles incoming HTTP POST request
router.post("/login", login);

export default router;
