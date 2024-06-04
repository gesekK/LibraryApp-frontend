import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const term = event.currentTarget.value.trim();
      if (term !== '') {
        console.log('Search: ', term);
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
