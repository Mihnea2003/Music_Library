import React, { useState } from 'react';
import './AddArtist.css';
import Background from '../Components/Background';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddArtist = () => {
  const [artistName, setArtistName] = useState('');
  const [albums, setAlbums] = useState([{ albumTitle: '', songs: [{ title: '', length: '' }], description: '' }]);
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...albums];
    if (name.startsWith('songTitle')) {
      const songIndex = parseInt(name.split('-')[1]);
      list[index].songs[songIndex].title = value;
    } else if (name.startsWith('songLength')) {
      const songIndex = parseInt(name.split('-')[1]);
      list[index].songs[songIndex].length = value;
    } else {
      list[index][name] = value;
    }
    setAlbums(list);
  };

  const handleAddAlbum = () => {
    setAlbums([...albums, { albumTitle: '', songs: [{ title: '', length: '' }], description: '' }]);
  };

  const handleAddSong = (index) => {
    const list = [...albums];
    list[index].songs.push({ title: '', length: '' });
    setAlbums(list);
  };

  const handleRemoveAlbum = (index) => {
    const list = [...albums];
    list.splice(index, 1);
    setAlbums(list);
  };

  const handleRemoveSong = (albumIndex, songIndex) => {
    const list = [...albums];
    list[albumIndex].songs.splice(songIndex, 1);
    setAlbums(list);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/artists', {
        name: artistName,
        albums: albums.map(album => ({
          title: album.albumTitle,
          songs: album.songs.map(song => ({
            title: song.title,
            length: song.length
          })),
          description: album.description
        }))
      });

      console.log('Artist created:', response.data);
      navigate('/');
      setArtistName('');
      setAlbums([{ albumTitle: '', songs: [{ title: '', length: '' }], description: '' }]);
    } catch (error) {
      console.error('Error creating artist:', error);
      // Handle error state or display error message to user
    }
  };

  return (
    <div>
      <Background></Background>
      <div className="add-artist-container">
        <div className="add-artist-form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="name">Artist Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                required
              />
            </div>

            <div id="albumsContainer">
              {albums.map((album, albumIndex) => (
                <div key={albumIndex} className="album-container">
                  <div className="input-container">
                    <label htmlFor={`albumTitle${albumIndex}`}>Album Title:</label>
                    <input
                      type="text"
                      id={`albumTitle${albumIndex}`}
                      name="albumTitle"
                      value={album.albumTitle}
                      onChange={(e) => handleInputChange(albumIndex, e)}
                      required
                    />
                  </div>

                  <div className="input-container">
                    <label>Songs:</label>
                    {album.songs.map((song, songIndex) => (
                      <div key={songIndex} className="song-container">
                        <input
                          type="text"
                          id={`songTitle-${albumIndex}-${songIndex}`}
                          name={`songTitle-${songIndex}`}
                          placeholder="Song Title"
                          value={song.title}
                          onChange={(e) => handleInputChange(albumIndex, e)}
                          required
                        />
                        <input
                          type="text"
                          id={`songLength-${albumIndex}-${songIndex}`}
                          name={`songLength-${songIndex}`}
                          placeholder="Song Length"
                          value={song.length}
                          onChange={(e) => handleInputChange(albumIndex, e)}
                          required
                        />
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveSong(albumIndex, songIndex)}
                        >
                          Remove Song
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => handleAddSong(albumIndex)}
                    >
                      Add Song
                    </button>
                  </div>

                  <div className="input-container">
                    <label htmlFor={`description${albumIndex}`}>Description:</label>
                    <input
                      type="text"
                      id={`description${albumIndex}`}
                      name="description"
                      value={album.description}
                      onChange={(e) => handleInputChange(albumIndex, e)}
                    />
                  </div>

                  {albumIndex !== 0 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveAlbum(albumIndex)}
                    >
                      Remove Album
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-button" onClick={handleAddAlbum}>
              Add Album
            </button>

            <br /><br />
            <button type="submit" className="add-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtist;
