import React from "react";

const SortOptions = ({ currentSort, onSortChange }) => {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="p-2 border rounded"
      aria-label="Sort products"
    >
      <option value="">Sort By</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="popularity">Popularity</option>
    </select>
  );
};

export default SortOptions;
