import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red", "Blue", "Green", "Black", "White", "Yellow",
    "Pink", "Navy", "Beige", "Gray",
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim"];
  const genders = ["Men", "Women"];
  const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's"];

  // Load filters from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      brand: params.brand ? params.brand.split(",") : [],
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      gender: params.gender || "",
      minPrice: 0,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 1000,
    });

    setPriceRange([
      0,
      params.maxPrice ? parseFloat(params.maxPrice) : 1000,
    ]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        if (!newFilters[name].includes(value)) {
          newFilters[name] = [...newFilters[name], value];
        }
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key] !== "" && newFilters[key] !== 0) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newMaxPrice = parseFloat(e.target.value);
    setPriceRange([0, newMaxPrice]);

    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newMaxPrice,
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 border-r">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border border-gray-300 transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              name="color"
              value={color}
              onClick={() =>
                handleFilterChange({
                  target: {
                    name: "color",
                    value: color,
                    type: "button",
                  },
                })
              }
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div className="flex items-center mb-1" key={size}>
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div className="flex items-center mb-1" key={material}>
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-800 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div className="flex items-center mb-1" key={brand}>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span className="text-gray-700">Min: ${priceRange[0]}</span>
          <span className="text-gray-700">Max: ${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
