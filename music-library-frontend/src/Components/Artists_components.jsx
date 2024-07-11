import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  return (
    <div className="artists-section">
      <h2>Artists Section</h2>
      <ul>
        {artists.map((artist, index) => (
          <li key={index}>
            <h3>{artist.name}</h3>
            <ul>
              {artist.albums.map((album, idx) => (
                <li key={idx}>
                  <strong>{album.title}</strong> - {album.description}
                  <ul>
                    {album.songs.map((song, i) => (
                      <li key={i}>
                        {song.title} ({song.length})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Artists;
