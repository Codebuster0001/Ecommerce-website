// src/components/Products/SortOptions.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set('sort', sortBy);
    } else {
      searchParams.delete('sort');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className='mb-4 flex justify-end items-center'>
      <label htmlFor="sort" className="mr-2 text-gray-700">Sort By:</label>
      <select
        onChange={handleSortChange}
        value={searchParams.get('sort') || ''}
        name="sort"
        className='border p-2 rounded-md focus:outline-none text-gray-700'
        id="sort"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;