import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import UploadForm from './components/UploadForm';
import VideoList from './components/VideoList';

const App: React.FC = () => {
  const [refreshList, setRefreshList] = useState<boolean>(false);

  /**
   * Handles the refresh of the list.
   */
  const handleRefreshList = () => {
    setRefreshList(!refreshList);
  };
  return (
    <>
      <UploadForm onUploadComplete={handleRefreshList} />
      <VideoList refreshList={refreshList}/>
    </>
  );
}

export default App;
