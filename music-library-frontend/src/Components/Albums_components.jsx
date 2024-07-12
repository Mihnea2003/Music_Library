import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Albums_components.css'; 

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/albums');
      console.log(response.data);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % albums.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + albums.length) % albums.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const toggleActionButtons = () => {
    setShowActionButtons(!showActionButtons);
  };

  const handleAddAlbum = () => {
    console.log('Add Album');
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/albums/${id}`);
      const updatedAlbums = albums.filter(album => album.id !== id);
      setAlbums(updatedAlbums);
      setCurrentPage((prevPage) => (prevPage - 1 + updatedAlbums.length) % updatedAlbums.length);
      setShowActionButtons(false); // Hide action buttons after deleting
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const handleUpdateAlbum = (id) => {
    console.log(`Update Album with id: ${id}`);
  };

  return (
      <div className="albums-section">
        <h2>Albums Section</h2>
        {albums.length > 0 && (
          <div>
            <div className="album-header">
              <h3 className="album-title">{albums[currentPage].title}</h3>
              <div className="album-actions">
                <button onClick={toggleActionButtons}>Actions</button>
                {showActionButtons && (
                  <div className="action-buttons">
                    <button onClick={handleAddAlbum}>Add Album</button>
                    <button onClick={() => handleUpdateAlbum(albums[currentPage].title)}>Update Album</button>
                    <button onClick={() => handleDeleteAlbum(albums[currentPage].id)}>Delete Album</button>
                  </div>
                )}
              </div>
            </div>
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
