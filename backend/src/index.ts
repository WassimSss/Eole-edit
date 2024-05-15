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

const app = express();
const port = process.env.PORT || 3000;

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

app.post('/upload', upload.single('video'), (req : express.Request , res : express.Response) => {
  const file = req.file;

  if(!file){
    return res.status(400).send('Please upload a file');
  }

  const { path, filename } = file;
  const normalizedFileName = normalizeFileName(filename);

  const outputFilePath = `uploads/compress-${normalizedFileName}`;

  ffmpeg(path)
  .outputOptions('-flags:v', '+ildct')
    .videoCodec('libx264')
    .audioCodec('aac')
    .audioBitrate('1M')
    .output(outputFilePath)
    .on('end', () => {
      fs.unlinkSync(path);
      res.json({ result: true, file: outputFilePath, message: 'File uploaded and compressed successfully' });
    })
    .on('error', (err: Error) => {
      console.log('Error', err);
      res.status(500).json({ result: true, message: 'File uploaded and compressed successfully' });
    })
    .run();
  })


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });