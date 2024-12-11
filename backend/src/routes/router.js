// ../backend/src/routes/router.js

import express from 'express';
import upload from '../middleware/upload.js';
import { aiCall } from '../controllers/aiController.js';

const router = express.Router();

router.post('/api/ai', upload, aiCall);

export default router;
