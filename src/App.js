import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

import './App.css';

export default function App() {
  const [searchImageName, setSearchImageName] = useState('');
  return (
    <div className="App">
      <ToastContainer />
      <Searchbar submit={setSearchImageName} />

      <ImageGallery searchImageName={searchImageName} />
    </div>
  );
}