import express from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Create a storage to store the uploaded files on uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Rename the file to include the current date to avoid conflicts
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
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
  // Get the file from the request
  const file = req.file;

  if (!file) {
    return res.status(400).json({result: false, message : 'Please upload a file'});
  }
  
  const { filename } = file;

  const inputFilePath = file.path;
  // Create the output file path without forbidden characters
  const outputFilePath = path.join('uploads', `compress-${normalizeFileName(filename)}`);
  console.log(" outputFilePath : ", outputFilePath);

  // Check if the uploads folder exists


  // Compress the video and save it to the output file path
  ffmpeg(inputFilePath)
    .videoCodec('libx264')
    .audioCodec('aac')
    .outputOptions('-flags', '+ildct')
    .outputOptions('-b:a', '1M')
    .output(outputFilePath)
    .on('end', () => {
      // delete the original file
      fs.unlinkSync(inputFilePath);
      res.json({ result: true, file: outputFilePath, message: 'File uploaded and compressed successfully' });
    })
    .on('error', (err: Error) => {
      console.error('Erreur lors de la conversion :', err);
      res.json({ result: false, message: 'Error converting the file' });
    })
    .run();
})

app.get('/files', (req, res) => {
  // Get the path of the uploads folder
  const directoryPath: string = path.join(__dirname, '../uploads');

  fs.readdir(directoryPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('Error getting the files', err);
      return res.status(500).json({ result: false, message: 'Server error' });
    }

    const formattedFiles = files.map((file: string) => {
      return {
        url: `/uploads/${file}`,
        name: file,
      };
    });

    res.json({ result: true, files: formattedFiles });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});