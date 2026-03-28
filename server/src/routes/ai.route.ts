import express from 'express';
import { startChat, resumeChat } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/start-chat', startChat);
router.post('/chat', resumeChat);

export default router;
