// ../bckend/src/controllers/imgController.js

import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const processImages = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files provided for processing' });
    }

    try {
        const fileData = req.files.map(file => ({
            path: file.path,
            filename: file.filename
        }));

        const responses = [];

        for (const file of fileData) {
            const aiResponse = await axios.post(process.env.AI_ENDPOINT, {
                filePath: file.path,
                fileName: file.filename,
                additionalData: {
                    prompt: req.body.prompt || 'Analyze, organize, and generate promotional material',
                    platforms: req.body.platforms || ['social', 'web', 'print']
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'PlatformPal/1.0'
                }
            });

            responses.push({
                file: file.filename,
                result: imgResponse.data
            });
        }

        fileData.forEach(file => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });

        return res.status(200).json({
            message: 'Files processed successfully',
            data: responses
        });

    } catch (error) {
        console.error('Error processing files:', error.message);
        return res.status(500).json({
            error: 'An error occurred while processing the files',
            details: error.message
        });
    }
};

export default processImages;
