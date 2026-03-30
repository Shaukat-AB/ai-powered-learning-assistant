import express from 'express';
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from '../controllers/document.controller.js';
import { uploadPdf } from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/', getDocuments);
router.post('/upload', uploadPdf, uploadDocument);
router.delete('/delete', deleteDocument);

export default router;
