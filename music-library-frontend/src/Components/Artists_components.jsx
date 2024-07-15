import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Artists_components.css';
import { useNavigate } from 'react-router-dom'
function Artists() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/artists');
      setArtists(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % artists.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + artists.length) % artists.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const toggleActionButtons = () => {
    setShowActionButtons(!showActionButtons);
  };

  const handleAddArtist = () => {
    navigate('/add-artist');
  };

  const handleDeleteArtist = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to proceed?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/artists/${id}`);
        const updatedArtists = artists.filter(artist => artist.id !== id);
        setArtists(updatedArtists);
        setCurrentPage((prevPage) => (prevPage - 1 + updatedArtists.length) % updatedArtists.length);
        setShowActionButtons(false); // Hide action buttons after deleting
      } catch (error) {
        console.error('Error deleting artist:', error);
      }
    }
  };

  const handleUpdateArtist = (id) => {
    console.log(`Update Artist with id: ${id}`);
  };

  return (
    <div className="artists-section">
      <h2>Artists Section</h2>
      <button className="add-button" onClick={handleAddArtist}>Add Artist</button>
      {artists.length > 0 && (
        <div>
          <div className="artist-header">
            <h3 className="artist-name">{artists[currentPage].name}</h3>
            <div className="artist-actions">
              <button onClick={toggleActionButtons}>Actions</button>
              {showActionButtons && (
                <div className="action-buttons">
                  <button onClick={() => handleUpdateArtist(artists[currentPage].id)}>Update Artist</button>
                  <button onClick={() => handleDeleteArtist(artists[currentPage].id)}>Delete Artist</button>
                </div>
              )}
            </div>
          </div>
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
