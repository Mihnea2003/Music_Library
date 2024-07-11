import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Albums_components.css'; // Example stylesheet for albums

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % albums.length);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + albums.length) % albums.length);
  };

  return (
    <div className="albums-section">
      <h2>Albums Section</h2>
      {albums.length > 0 && (
        <div>
          <h3>{albums[currentPage].title}</h3>
          <p>{albums[currentPage].description}</p>
          <ul>
            {albums[currentPage].songs.map((song, idx) => (
              <li key={idx}>
                <strong>{song.title}</strong> - {song.length}
              </li>
            ))}
          </ul>
          {albums.length > 1 && (
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

export default Albums;
