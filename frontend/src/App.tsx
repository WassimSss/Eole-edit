import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Header } from './components/Header';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

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
