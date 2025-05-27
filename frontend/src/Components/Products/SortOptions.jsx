import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
   searchParams.set('sort', sortBy);
    setSearchParams(searchParams);
  }
  return (
    <div className='mb-4 flex justify-end items-center'>
      <select
      onChange={handleSortChange}
      value={searchParams.get('sortBy') || ''}
      name="sort"
      className='border p-2 rounded-md focus:outline-none' id="sort">
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularlity</option>
      </select>
    </div>
  )
}

export default SortOptions