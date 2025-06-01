import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import productsData from "../data/products"; // your products data

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Load products data
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Apply filtering and sorting based on URL query params
  useEffect(() => {
    const filters = Object.fromEntries(searchParams.entries());
    let result = [...products];

    const parseArrayParam = (param) => {
      return filters[param] ? filters[param].split(",") : [];
    };

    const brandFilters = parseArrayParam("brand");
    const sizeFilters = parseArrayParam("size");
    const materialFilters = parseArrayParam("material");

    const category = filters.category || "";
    const gender = filters.gender || "";
    const color = filters.color || "";
    const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : 1000;
    const sort = filters.sort || "default";

    // Filter products
    result = result.filter((product) => {
      return (
        (category ? product.category === category : true) &&
        (gender ? product.gender?.toLowerCase() === gender.toLowerCase() : true) &&
        (color ? product.color?.toLowerCase() === color.toLowerCase() : true) &&
        (sizeFilters.length > 0 ? sizeFilters.includes(product.size) : true) &&
        (brandFilters.length > 0 ? brandFilters.includes(product.brand) : true) &&
        (materialFilters.length > 0 ? materialFilters.includes(product.material) : true) &&
        product.price <= maxPrice
      );
    });

    // Sort products
    switch (sort) {
      case "priceLowToHigh":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchParams, products]);

  // Close filter sidebar on outside click
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div ref={sidebarRef} className="z-20">
        <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Products</h2>
          <div className="flex items-center gap-4">
            <SortOptions />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden p-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800"
            >
              <FaFilter />
            </button>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default CollectionPage;
