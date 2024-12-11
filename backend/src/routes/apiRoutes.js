// ../backend/src/routes/apiRoutes.js

import express from 'express';
import upload from '../middleware/upload.js';
import { aiCall } from '../controllers/aiController.js';

const router = express.Router();

// Upload Endpoint
router.post('/api/upload', upload.single('imgFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'Upload Successful', filePath: req.file.path });
});

// AI Endpoint
router.post('/api/ai', upload.single('imgFile'), aiCall);

// Test Endpoint
router.get('/test', (req, res) => {
    try {
        res.status(200).json({ 
            message: 'The API route is working as intended.', 
            testPass: true 
        });
    } catch (error) {
        res.status(500).json({ error: 'API route is nonfunctional.' });
    }
});

export default router;
