import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Artists_components.css';
import { useNavigate } from 'react-router-dom';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/artists');
      setArtists(response.data);
      setSearchResults(response.data); // Set initial search results to all artists
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % searchResults.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + searchResults.length) % searchResults.length);
    setShowActionButtons(false); // Hide action buttons when changing page
  };

  const toggleActionButtons = () => {
    setShowActionButtons(!showActionButtons);
  };

  const handleAddArtist = () => {
    navigate('/add-artist');
  };

  const handleDeleteArtist = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to proceed?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/artists/${id}`);
        const updatedArtists = artists.filter((artist) => artist.id !== id);
        setArtists(updatedArtists);
        setSearchResults(updatedArtists);
        setCurrentPage((prevPage) => (prevPage - 1 + updatedArtists.length) % updatedArtists.length);
        setShowActionButtons(false); // Hide action buttons after deleting
      } catch (error) {
        console.error('Error deleting artist:', error);
      }
    }
  };

  const handleUpdateArtist = (id) => {
    navigate(`/update-artist/${id}`);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchInput(query);

    const filteredSuggestions = artists
      .map(artist => artist.name)
      .filter(name => name.toLowerCase().includes(query.toLowerCase()));

    setSuggestions(filteredSuggestions);

    const filteredArtists = artists.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredArtists);
    setCurrentPage(0); 
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setSuggestions([]);

    const filteredArtists = artists.filter(artist =>
      artist.name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setSearchResults(filteredArtists);
    setCurrentPage(0); 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      if (suggestions.length > 0) {
        event.preventDefault();
        const index = Math.min(suggestions.length - 1, suggestions.indexOf(searchInput) + 1);
        setSearchInput(suggestions[index]);
      }
    } else if (event.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        event.preventDefault();
        const index = Math.max(0, suggestions.indexOf(searchInput) - 1);
        setSearchInput(suggestions[index]);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  return (
    <div className="artists-section" style={{ marginTop: '20px' }}>
      <div className="search-box-artist">
        <input
          type="text"
          placeholder="Search artists..."
          value={searchInput}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          ref={inputRef}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={suggestion === searchInput ? 'active' : ''}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2>Artists Section</h2>
      <button className="add-button" onClick={handleAddArtist}>
        Add Artist
      </button>

      {artists.length > 0 && (
        <div>
          {searchResults.length === 0 && <p>No results found.</p>}
          {searchResults.length > 0 && (
            <div>
              <h3 className="artist-name">{searchResults[currentPage].name}</h3>

              <div className="artist-actions">
                <button onClick={toggleActionButtons}>Actions</button>
                {showActionButtons && (
                  <div className="action-buttons">
                    <button onClick={() => handleUpdateArtist(searchResults[currentPage].id)}>
                      Update Artist
                    </button>
                    <button onClick={() => handleDeleteArtist(searchResults[currentPage].id)}>
                      Delete Artist
                    </button>
                  </div>
                )}
              </div>

              <ul>
                {searchResults[currentPage].albums.map((album, idx) => (
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

              {searchResults.length > 1 && (
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
      )}
    </div>
  );
}

export default Artists;
