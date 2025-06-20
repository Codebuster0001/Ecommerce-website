import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../Components/Products/FilterSidebar"; // Assuming this path is correct
import ProductGrid from "../Components/Products/ProductGrid";     // Assuming this path is correct
import SortOptions from "../Components/Products/SortOptions";     // Assuming this path is correct
import productsData from "../data/products"; // Adjust this path if your product data is located elsewhere

const PRODUCTS_PER_PAGE = 12;

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize products from your data source
  useEffect(() => {
    setProducts(
      Array.isArray(productsData) ? productsData : productsData.products
    );
  }, []);

  // Memoize filters extracted from URL search params
  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  // Helper function to parse comma-separated array parameters
  const parseArrayParam = (param) =>
    filters[param] ? filters[param].split(",").filter(Boolean) : [];

  // Extract all filter values from the URL, including the search query
  const brandFilters = useMemo(() => parseArrayParam("brand"), [filters]);
  const sizeFilters = useMemo(() => parseArrayParam("size"), [filters]);
  const materialFilters = useMemo(() => parseArrayParam("material"), [filters]);
  const category = filters.category || "";
  const gender = filters.gender || "";
  const color = filters.color || "";
  const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : 1000;
  const sort = filters.sort || "";
  const searchQuery = filters.query || "";

  // Main filtering and sorting logic
  useEffect(() => {
    let result = [...products];

    result = result.filter((product) => {
      // Category filter
      const productCategory = product.category?.toLowerCase() || "";
      const filterCategory = category.toLowerCase();
      const categoryMatch = category ? productCategory === filterCategory : true;

      // Gender filter
      const genderMatch = gender
        ? product.gender?.toLowerCase() === gender.toLowerCase()
        : true;

      // Color filter
      const colorMatch = (() => {
        if (!color) return true;
        if (!product.colors) return false;
        if (Array.isArray(product.colors)) {
          return product.colors.some(
            (c) => c.toLowerCase() === color.toLowerCase()
          );
        }
        return product.colors.toLowerCase() === color.toLowerCase();
      })();

      // Size filter
      const sizeMatch = (() => {
        if (sizeFilters.length === 0) return true;
        if (!product.sizes) return false;
        if (Array.isArray(product.sizes)) {
          return sizeFilters.some((sf) =>
            product.sizes.map((s) => s.toLowerCase()).includes(sf.toLowerCase())
          );
        }
        return sizeFilters.some(
          (sf) => sf.toLowerCase() === product.sizes.toLowerCase()
        );
      })();

      // Brand filter
      const brandMatch = (() => {
        if (brandFilters.length === 0) return true;
        if (!product.brand) return false;
        if (Array.isArray(product.brand)) {
          return brandFilters.some((bf) =>
            product.brand.map((b) => b.toLowerCase()).includes(bf.toLowerCase())
          );
        }
        return brandFilters.some(
          (bf) => bf.toLowerCase() === product.brand.toLowerCase()
        );
      })();

      // Material filter
      const materialMatch = (() => {
        if (materialFilters.length === 0) return true;
        if (!product.material) return false;
        if (Array.isArray(product.material)) {
          return materialFilters.some((mf) =>
            product.material
              .map((m) => m.toLowerCase())
              .includes(mf.toLowerCase())
          );
        }
        return materialFilters.some(
          (mf) => mf.toLowerCase() === product.material.toLowerCase()
        );
      })();

      // Price filter
      const priceMatch = product.price <= maxPrice;

      // Search Query Match
      const searchMatch = searchQuery
        ? product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        : true; // If no search query, all products match

      // Combine all filter conditions
      const allConditionsMet =
        categoryMatch &&
        genderMatch &&
        colorMatch &&
        sizeMatch &&
        brandMatch &&
        materialMatch &&
        priceMatch &&
        searchMatch;

      return allConditionsMet;
    });

    // Apply sorting
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
    searchQuery,
  ]);

  // Function to update URL search parameters
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
        updated.set(key, Array.isArray(value) ? value.join(",") : value);
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

  // Close sidebar when clicking outside
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

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 pb-14 z-50 bg-white border-r border-gray-200 max-h-screen
          transform transition-transform duration-300 ease-in-out
          w-56 sm:w-64
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:max-h-full lg:overflow-visible
          flex-shrink-0
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
            query: searchQuery,
          }}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="flex flex-col flex-1 mx-auto w-full">
        {/* Header - Title + Sort + Filter Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl px-8 py-6 font-semibold flex-shrink-0">
            {searchQuery ? `Search Results for "${decodeURIComponent(searchQuery)}"` : "All Products"}
          </h2>
          <div className="flex px-8 items-center justify-between gap-4 flex-wrap">
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

        {/* Product Grid */}
        <div className="px-8 py-4">
          {paginatedProducts.length > 0 ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <p className="text-center text-gray-600 text-lg py-10">No products found matching your criteria.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="flex justify-center items-center gap-2 mt-6 flex-wrap"
          >
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
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
                >
                  {page}
                </button>
              );
            })}
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;