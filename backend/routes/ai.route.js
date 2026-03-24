import express from 'express';
import postAI from "../controllers/ai.controller.js"

const router = express.Router();

router.post("/",postAI)

export default router;