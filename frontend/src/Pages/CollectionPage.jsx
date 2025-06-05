import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import productsData from "../data/products";

const PRODUCTS_PER_PAGE = 5; // Show only 5 products per page

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

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

    // Reset to page 1 on filter or sort change
    setCurrentPage(1);
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  // Pagination handlers
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
    fixed inset-y-0 left-0 z-50 w-64 bg-white
    border-r border-gray-200
    border-b-0
    
    overflow-y-auto max-h-screen
    transform transition-transform duration-300 ease-in-out
    lg:static lg:translate-x-0 lg:overflow-visible lg:max-h-full
    ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
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
      <main className="flex-1 flex flex-col px-4 py-6">
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

        <ProductGrid products={paginatedProducts} />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  className={`px-3 py-1 border rounded ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => goToPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;
