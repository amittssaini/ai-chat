import express from 'express';
import {getHistory,postChat,getHistoryById} from '../controllers/chat.controller.js';
const router = express.Router();
router.post("/save",postChat)
router.get("/history/:id",getHistoryById)
router.get("/history",getHistory)


export default router;