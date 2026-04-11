import express from 'express';

import { aiFileContext } from '../middleware/ai.middleware.js';
import { chat } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/chat', aiFileContext, chat);

export default router;
