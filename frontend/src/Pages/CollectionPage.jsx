import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import productsData from "../data/products";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setProducts(
      Array.isArray(productsData) ? productsData : productsData.products
    );
  }, []);

  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const parseArrayParam = (param) =>
    filters[param] ? filters[param].split(",") : [];

  const brandFilters = useMemo(() => parseArrayParam("brand"), [filters]);
  const sizeFilters = useMemo(() => parseArrayParam("size"), [filters]);
  const materialFilters = useMemo(() => parseArrayParam("material"), [filters]);
  const category = filters.category || "";
  const gender = filters.gender || "";
  const color = filters.color || "";
  const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : 1000;
  const sort = filters.sort || "";

  useEffect(() => {
    let result = [...products];

    result = result.filter((product) => {
      return (
        (category ? product.category === category : true) &&
        (gender
          ? product.gender?.toLowerCase() === gender.toLowerCase()
          : true) &&
        (color ? product.color?.toLowerCase() === color.toLowerCase() : true) &&
        (sizeFilters.length > 0 ? sizeFilters.includes(product.size) : true) &&
        (brandFilters.length > 0
          ? brandFilters.includes(product.brand)
          : true) &&
        (materialFilters.length > 0
          ? materialFilters.includes(product.material)
          : true) &&
        product.price <= maxPrice
      );
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [
    products,
    category,
    gender,
    color,
    brandFilters,
    sizeFilters,
    materialFilters,
    maxPrice,
    sort,
  ]);

  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        updated.delete(key);
      } else {
        if (Array.isArray(value)) {
          updated.set(key, value.join(","));
        } else {
          updated.set(key, value);
        }
      }
    });
    setSearchParams(updated);
  };

  const handleFilterChange = (filterKey, filterValue) => {
    updateParams({ [filterKey]: filterValue });
  };

  const handleSortChange = (newSort) => {
    updateParams({ sort: newSort });
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="flex relative min-h-screen bg-white">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          shadow-lg
        `}
      >
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={{
            brand: brandFilters,
            size: sizeFilters,
            material: materialFilters,
            category,
            gender,
            color,
            maxPrice,
          }}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Overlay for mobile when sidebar open */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 py-6 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Products</h2>
          <div className="flex items-center gap-4">
            <SortOptions currentSort={sort} onSortChange={handleSortChange} />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden p-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800"
              aria-label="Open Filters"
            >
              <FaFilter size={18} />
            </button>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
};

export default CollectionPage;
