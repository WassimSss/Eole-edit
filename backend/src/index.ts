// const express = require('express');
// const multer = require('multer');
// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// const fs = require('fs');

import express from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

/**
 * Normalizes a file name by replacing spaces with underscores and removing any special characters.
 * @param fileName - The original file name.
 * @returns The normalized file name.
 */

function normalizeFileName(fileName: string): string {
  let normalized = fileName.replace(/\s+/g, '_');

  normalized = normalized.replace(/[^\w.-]/g, '-');

  return normalized;
}

app.post('/upload', upload.single('video'), (req: express.Request, res: express.Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('Please upload a file');
  }

  const { path, filename } = file;

  console.log("filename : ", filename)
  console.log("path : ", path)

  // const inputFilePath = 'uploads/test.mp4';
  const inputFilePath = path;
  const outputFilePath = `uploads/compress-${filename}`;

  ffmpeg(inputFilePath)
    .videoCodec('libx264')
    .audioCodec('aac')
    .outputOptions('-flags', '+ildct')
    .outputOptions('-b:a', '1M')
    .output(outputFilePath)
    .on('end', () => {
      console.log('Conversion terminée !');
      fs.unlinkSync(path);
      res.json({ result: true, file: outputFilePath, message: 'File uploaded and compressed successfully' });
    })
    .on('error', (err: Error) => {
      console.error('Erreur lors de la conversion :', err);
    })
    .run();
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});