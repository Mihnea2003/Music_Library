import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Albums_components.css';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredSuggestions = albums
      .map(album => album.title)
      .filter(title => title.toLowerCase().includes(query.toLowerCase()));

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      if (suggestions.length > 0) {
        event.preventDefault();
        const index = Math.min(suggestions.length - 1, suggestions.indexOf(searchQuery) + 1);
        setSearchQuery(suggestions[index]);
      }
    } else if (event.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        event.preventDefault();
        const index = Math.max(0, suggestions.indexOf(searchQuery) - 1);
        setSearchQuery(suggestions[index]);
      }
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + filteredAlbums.length) % filteredAlbums.length);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % filteredAlbums.length);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  };

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="albums-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search albums..."
          value={searchQuery}
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
                className={suggestion === searchQuery ? 'active' : ''}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="albums-section">
        <h2>Albums Section</h2>
        {filteredAlbums.length > 0 && (
          <div>
            <div className="album-header">
              <h3 className="album-title">{filteredAlbums[currentPage].title}</h3>
            </div>
            <p>{filteredAlbums[currentPage].description}</p>
            <ul>
              {filteredAlbums[currentPage].songs.map((song, idx) => (
                <li key={idx}>
                  <strong>{song.title}</strong> - {song.length}
                </li>
              ))}
            </ul>
            {filteredAlbums.length > 1 && (
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
        {filteredAlbums.length === 0 && (
          <p>No albums found.</p>
        )}
      </div>
    </div>
  );
}

export default Albums;
