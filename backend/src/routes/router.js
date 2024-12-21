// ../backend/src/routes/router.js

import express from 'express';
import axios from 'axios';
import ImageKit from 'imagekit';
import upload from '../middleware/upload.js';
import getUpload from '../utilities/getUploads.js'; // Uncommented assuming this utility exists

const router = express.Router();

// Upload Route
router.post('/upload', upload, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  res.status(200).json({ message: 'Upload Successful', files: req.files });
});

// Image Prompt Route
router.get('/img-prompt', (req, res) => {
  const inputImages = getUpload();

  if (!inputImages || inputImages.length === 0) {
    return res.status(400).json({ error: 'No input images found' });
  }

  const imagePrompt = {
    task: "resize_images",
    description:
      "Resize all images to match the specifications of each image type for each social media platform. Avoid operations that may reduce quality, such as compression or filetype conversion. Do not crop, warp, or distort the images. Preserve resolution and aspect ratio, and fill empty space with solid black pixels.",
    data: {
      input_images: inputImages,
    },
    output: {
      Instagram: {
        "Profile Photo": "320x320",
        Landscape: "1080x566",
        Portrait: "1080x1350",
        Square: "1080x1080",
        Stories: "1080x1920",
      },
      Facebook: {
        "Profile Photo": "170x170",
        Landscape: "1200x630",
        Portrait: "630x1200",
        Square: "1200x1200",
        Stories: "1080x1920",
        "Cover Photo": "820x312",
      },
      Twitter: {
        "Profile Photo": "400x400",
        Landscape: "1600x900",
        Portrait: "1080x1350",
        Square: "1080x1080",
        "Cover Photo": "1500x500",
      },
      LinkedIn: {
        "Profile Photo": "400x400",
        Landscape: "1200x627",
        Portrait: "627x1200",
        Square: "1080x1080",
        "Cover Photo": "1128x191",
      },
      TikTok: {
        "Profile Photo": "200x200",
        Portrait: "1080x1920",
        Square: "1080x1080",
        Stories: "1080x1920",
      },
      Etsy: {
        "Profile Photo": "500x500",
        Square: "2000x2000",
        "Cover Photo": "3360x840",
        Banner: "3360x840",
        Thumbnail: "570x456",
      },
      YouTube: {
        "Profile Photo": "800x800",
        Landscape: "1280x720",
        "Cover Photo": "2048x1152",
        Banner: "2048x1152",
        Thumbnail: "1280x720",
      },
      Tumblr: {
        "Profile Photo": "128x128",
        Landscape: "1280x750",
        Portrait: "1280x1920",
        Square: "500x500",
        "Cover Photo": "3000x1055",
        Banner: "3000x1055",
      },
    },
  };

  res.json(imagePrompt);
});

// AI Image Editor API Route
router.post('/img-resize', async (req, res) => {
  const { images } = req.body; // Expecting an array of image URLs or paths in the request body

  if (!images || images.length === 0) {
    return res.status(400).json({ error: 'No images provided for resizing' });
  }

  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const resizedImages = await Promise.all(
      images.map(async (image) => {
        const response = await imagekit.url({
          src: image,
          transformation: [{ width: 1080, height: 1080, crop: 'maintain_ratio' }],
        });
        return response;
      })
    );

    res.status(200).json({ message: 'Images resized successfully', resizedImages });
  } catch (error) {
    console.error('Error resizing images:', error.message);
    res.status(500).json({ error: 'Failed to resize images' });
  }
});

export default router;
