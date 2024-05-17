import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Container } from 'react-bootstrap';

interface VideoListProps {
  refreshList: boolean;
  handlePlayVideo: Function;
}

interface videoObject {
  name: string;
  url: string;
}
const VideoList: React.FC<VideoListProps> = ({ refreshList, handlePlayVideo }) => {
  const [videos, setVideos] = useState<videoObject[]>([]);

  /**
   * Loads videos from the server and updates the state with the fetched data.
   */
  const loadVideos = async () => {
    const response = await fetch('http://localhost:3000/files');

    const data = await response.json();

    if (data.result) {
      setVideos(data.files);
    }
  };

  // useEffect hook to load videos when the component mounts and when the refreshList prop changes
  useEffect(() => {
    loadVideos();
  }, [refreshList]);

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h2 className='text-success m-4'>Videos</h2>
      <ul className='list-unstyled d-flex flex-wrap justify-content-center align-items-center'>
        {videos.map((video, index) => {
          const formattedName = video.name.split('.')[0];
          return (
            <li key={index} className='m-2' style={{ flex: '0 0 25%', maxWidth: '25%' }} onClick={() => handlePlayVideo(video.url)}>
              <button type="button" className="btn btn-dark w-100">{formattedName.replace(/compress-[0-9]*-/i, "").replaceAll('_', ' ')}</button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default VideoList;
