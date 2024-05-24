## Description

This is a web application that allows you to upload and compress video files. It provides a simple interface for uploading videos and automatically compresses them to reduce file size while maintaining acceptable video quality.

## Features

- Upload video files of various formats
- Automatic video compression to reduce file size
- Display a list of uploaded files
- Error handling for invalid file formats or other issues
- Video playback functionality

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/WassimSss/Eole-edit.git
    ```

2. Install the required dependencies for frontend and backend:

    ```bash
    npm install
    ```
    or
     ```bash
    yarn install

3. Delete the .gitkeep file in the `uploads` directory.

4. Download the Fluent FFmpeg zip file for your operating system from [ffmpeg.org](https://ffmpeg.org/download.html).

5. Extract the Fluent FFmpeg zip file and locate the `bin` directory.

6. Add the `bin` directory to the system's PATH environment variable.

7. Start backend 

    ```bash
    yarn dev
    ```
        or
    ```bash
    npm run dev
    ```

8. Start frontend
    ```bash
    yarn start
    ```
        or
    ```bash
    npm run start
    ```

9. Compress !

## Usage

1. Open the application in your web browser by navigating to `http://localhost:5000`.
2. Click on the input file to select a video file from your local machine.
3. Click on the "Upload" button to upload your video.
3. Wait for the upload and compression processes to complete.
4. Once the compression is finished, you can read the compressed video file.

