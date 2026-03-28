import express from 'express';
import { startChat, resumeChat } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/start', startChat);
router.post('/resume', resumeChat);

export default router;
