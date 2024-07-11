import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Artists_components.css';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % artists.length);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + artists.length) % artists.length);
  };

  return (
    <div className="artists-section">
      <h2>Artists Section</h2>
      {artists.length > 0 && (
        <div>
          <h3>{artists[currentPage].name}</h3>
          <ul>
            {artists[currentPage].albums.map((album, idx) => (
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
          {artists.length > 1 && (
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={prevPage}>
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default Artists;
