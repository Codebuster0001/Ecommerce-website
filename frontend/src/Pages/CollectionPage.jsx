import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Components/Products/FilterSidebar";
import SortOptions from './../Components/Products/SortOptions';
import ProductGrid from "../Components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Similar Product 1",
          price: 35.0,
          images: [{ url: "https://picsum.photos/500/500?random=13" }],
        },
        {
          _id: 2,
          name: "Another Great Shirt",
          price: 48.0,
          images: [{ url: "https://picsum.photos/500/500?random=14" }],
        },
        {
          _id: 3,
          name: "Casual Cotton Tee",
          price: 22.75,
          images: [{ url: "https://picsum.photos/500/500?random=15" }],
        },
        {
          _id: 4,
          name: "Premium Denim Shirt",
          price: 59.99,
          images: [{ url: "https://picsum.photos/500/500?random=16" }],
        },
        {
          _id: 5,
          name: "Stylish Blouse",
          price: 45.0,
          images: [{ url: "https://picsum.photos/500/500?random=17" }],
        },
        {
          _id: 6,
          name: "Elegant Dress",
          price: 89.99,
          images: [{ url: "https://picsum.photos/500/500?random=18" }],
        },
        {
          _id: 7,
          name: "Trendy Jacket",
          price: 120.0,
          images: [{ url: "https://picsum.photos/500/500?random=19" }],
        },
        {
          _id: 8,
          name: "Classic Trousers",
          price: 55.0,
          images: [{ url: "https://picsum.photos/500/500?random=20" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row px-4 py-8">
      {/* Filter Button (visible only on small screens) */}
      <button
        className="lg:hidden p-2 mb-4 flex justify-center items-center gap-2 bg-gray-100 rounded"
        onClick={toggleFilter}
        aria-label="Toggle Filter Sidebar"
      >
        <FaFilter />
        Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-auto lg:w-64 lg:shadow-none`}
      >
        <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
      </div>

      {/* Products Grid */}
      <div className="flex-grow p-4">
            <h2>Our Products</h2>

            <SortOptions />
            
            <ProductGrid products={products} />

      </div>
    </div>
  );
};

export default CollectionPage;
