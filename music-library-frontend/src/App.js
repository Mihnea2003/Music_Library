import React, { useState } from 'react';
import './App.css';
import Artists from './Components/Artists_components';
import Albums from './Components/Albums_components';
import Background from './Components/Background';
function App() {
  const [showArtists, setShowArtists] = useState(false);
  const [showAlbums,setShowAlbums] = useState(false);

  const handleShowArtists = () => {
    setShowArtists(true); 
    setShowAlbums(false);
  };

  const handleShowAlbums = () => {
    setShowArtists(false); 
    setShowAlbums(true);
  };

  return (
    <div className="App">
      <Background />
      <header className="App-header">
        <h1>Welcome to Your Music Library!</h1>
        <div className="button-container">
        <button className="App-button" onClick={handleShowArtists}>Artists</button>
        <button className="App-button" onClick={handleShowAlbums}>Albums</button>
        </div>
        <div className="horizontal-line"></div>
        {showArtists && <Artists />}
        {showAlbums && <Albums/>}
      </header>
    </div>
  );
}

export default App;
