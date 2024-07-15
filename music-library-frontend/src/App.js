import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import AddArtist from './Pages/AddArtist';
import Home from './Pages/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="/add-artist" element={<AddArtist/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
