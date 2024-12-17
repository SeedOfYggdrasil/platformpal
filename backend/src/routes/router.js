// ../backend/src/routes/router.js

import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

// Upload Route
router.post('/upload', upload, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  res.status(200).json({ message: 'Upload Successful', files: req.files });
});

export default router;
