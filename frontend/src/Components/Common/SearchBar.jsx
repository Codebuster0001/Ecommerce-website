// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/collection?query=${encodeURIComponent(searchTerm.trim())}`);
      if (onSearch) onSearch(); // Close on search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-4 pr-4 py-2 text-base text-gray-800 placeholder-gray-400 border border-gray-500 rounded-md shadow-sm transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
