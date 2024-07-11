import React, { useState } from 'react';
import './App.css';
import Artists from './Components/Artists_components';

function App() {
  const [showArtists, setShowArtists] = useState(false);
  

  const handleShowArtists = () => {
    setShowArtists(true);
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Music Library!</h1>
        <div className="button-container">
        <button className="App-button" onClick={handleShowArtists}>Artists</button>
        <button className="App-button">Albums</button>
        </div>
        <div className="horizontal-line"></div>
        {showArtists && <Artists />}
        
      </header>
    </div>
  );
}

export default App;
