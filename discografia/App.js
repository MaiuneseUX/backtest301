import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AddAlbum from './components/AddAlbum';
import AddTrack from './components/AddTrack';
import Header from './components/Header';
import Search from './components/Search';

import './App.css';

const App = () => {

  return (
    <>
      <div className="background">
        <div className="display">
          <Header />
          <Search />
          <Routes>
            <Route path="/" element={<AlbumList />} />
            <Route path="/search/" element={<AlbumList />} />
            <Route path="/search/:searchTerm" element={<AlbumList />} />
            <Route path="/add" element={<AddAlbum />} />
            <Route path="/album/:id" element={<AddTrack />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;


