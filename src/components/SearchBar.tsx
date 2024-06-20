import React, { useState } from 'react';
import '../styles/SearchBar.css';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const term = event.currentTarget.value.trim();
      if (term !== '') {
        onSearch(term);
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t('search.Search')}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
