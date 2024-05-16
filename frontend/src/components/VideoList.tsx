import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

interface VideoListProps {
  refreshList: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ refreshList }) => {
  const [videos, setVideos] = useState<string[]>([]);

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
    <Container>
      <h2>Liste des vidéos</h2>
      <ul className='list-unstyled d-flex flex-wrap justify-content-center align-items-center'>
        {videos.map((video, index) => {
          const formattedName = video.split('.')[0];
          return (
            <li key={index} className='m-2' style={{ flex: '0 0 25%', maxWidth: '25%' }}>
              <button type="button" className="btn btn-dark w-100">{formattedName}</button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default VideoList;
