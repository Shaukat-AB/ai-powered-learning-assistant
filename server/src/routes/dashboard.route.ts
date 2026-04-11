import express from 'express';

import { getDashboradData } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/', getDashboradData);

export default router;
