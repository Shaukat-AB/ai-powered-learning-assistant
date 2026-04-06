import express from 'express';

import {
  deleteQuiz,
  generateQuiz,
  getQuizzes,
} from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/get/:name', getQuizzes); // the current document's name
router.post('/generate', generateQuiz);
router.delete('/delete', deleteQuiz);

export default router;
