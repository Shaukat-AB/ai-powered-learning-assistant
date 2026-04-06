import express from 'express';

import { generateQuiz, getQuizzes } from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/get/:name', getQuizzes); // the current document's name
router.post('/generate', generateQuiz);

export default router;
