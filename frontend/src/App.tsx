import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import { Header } from './components/Header';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [urlVideoPlaying, setUrlVideoPlaying] = useState<string>("");

  /**
   * Handles the refresh of the list.
   */
  const handleRefreshList = () => {
    setRefreshList(!refreshList);
  };
  /**
   * Plays the video.
  */
  const handlePlayVideo = (url: string) => {
    setUrlVideoPlaying(url);
  }

  /**
   * Closes the video.
   */
  const handleCloseVideo = () => {
    setUrlVideoPlaying("");
  }

  return (
    <div className='d-flex justify-content-center align-items-center flex-column' >
      <Header />
      {urlVideoPlaying && (<VideoPlayer
        handleCloseVideo={handleCloseVideo}
        urlVideoPlaying={urlVideoPlaying}
        key={urlVideoPlaying}  // Force re-render by adding a unique key
      />)}
      <UploadForm onUploadComplete={handleRefreshList} />
      <VideoList refreshList={refreshList} handlePlayVideo={handlePlayVideo} />
    </ div >
  );
}

export default App;
