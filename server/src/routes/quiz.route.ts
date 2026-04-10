import express from 'express';

import {
  deleteQuiz,
  generateQuiz,
  getQuizzes,
  updateQuiz,
} from '../controllers/quiz.controller.js';

const router = express.Router();

router.get('/get/:name', getQuizzes); // the current document's name
router.post('/generate', generateQuiz);
router.post('/update', updateQuiz);
router.delete('/delete', deleteQuiz);

export default router;
