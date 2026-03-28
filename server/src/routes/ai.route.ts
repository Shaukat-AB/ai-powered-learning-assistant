import express from 'express';
import { startChat, chat } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/start-chat', startChat);
router.post('/chat', chat);

export default router;
