/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UpdateArtist.css'; // Import your CSS file
import Background from '../Components/Background'; // Import your Background component
import { useNavigate } from 'react-router-dom';

const UpdateArtist = () => {
  const { id } = useParams(); // Retrieve artist ID from URL params
  const [artist, setArtist] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtist();
  }, [id]);

  const fetchArtist = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/artists/${id}`);
      setArtist(response.data); 
      setArtistName(response.data.name);
      setAlbums(response.data.albums);
    } catch (error) {
      console.error('Error fetching artist:', error);
    }
  };

  const handleInputChange = (albumIndex, event) => {
    const { name, value } = event.target;
    const list = [...albums];
  
    if (name.startsWith('albumTitle')) {
      const albumTitle = value.trim(); // Trim to remove leading/trailing spaces
  
      // Only update if the trimmed value is not empty
      if (albumTitle !== '') {
        list[albumIndex].title = albumTitle;
        setAlbums(list);
      }
    } else if (name.startsWith('songTitle')) {
      const songIndex = parseInt(name.split('-')[1]);
      list[albumIndex].songs[songIndex].title = value;
      setAlbums(list);
    } else if (name.startsWith('songLength')) {
      const songIndex = parseInt(name.split('-')[1]);
      list[albumIndex].songs[songIndex].length = value;
      setAlbums(list);
    } else {
      list[albumIndex][name] = value;
      setAlbums(list);
    }
  };

  const handleUpdateArtist = async () => {
    try {
      await axios.put(`http://localhost:3000/api/artists/${id}`, {
        name: artistName,
        albums: albums.map(album => ({
          title: album.title,
          songs: album.songs.map(song => ({
            title: song.title,
            length: song.length
          })),
          description: album.description
        }))
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating artist:', error);
      navigate('/');
    }
  };

  const handleAddAlbum = () => {
    setAlbums([...albums, { title: '', songs: [{ title: '', length: '' }], description: '' }]);
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

  if (!artist) {
    return <div>Loading...</div>; // Add loading state if artist details are being fetched
  }

  return (
    <div className="update-artist-container">
      <Background />
      <div className="update-artist-form">
        <h2>Update Artist: {artist.name}</h2>
        <div className="input-container">
        <label>Artist Name:</label>
        <input
          type="text"
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
                name={`albumTitle-${albumIndex}`}
                value={album.title}
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
        <button type="button" className="add-button" onClick={handleUpdateArtist}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateArtist;
