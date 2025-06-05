import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../Components/Products/FilterSidebar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import productsData from "../data/products";

const PRODUCTS_PER_PAGE = 5;

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
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
    filters[param] ? filters[param].split(",").filter(Boolean) : [];

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
      const productCategory = product.category?.toLowerCase() || "";
      const filterCategory = category.toLowerCase();

      const categoryMatch = category ? productCategory === filterCategory : true;

      const genderMatch = gender
        ? product.gender?.toLowerCase() === gender.toLowerCase()
        : true;

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

      const materialMatch = (() => {
        if (materialFilters.length === 0) return true;
        if (!product.material) return false;
        if (Array.isArray(product.material)) {
          return materialFilters.some((mf) =>
            product.material.map((m) => m.toLowerCase()).includes(mf.toLowerCase())
          );
        }
        return materialFilters.some(
          (mf) => mf.toLowerCase() === product.material.toLowerCase()
        );
      })();

      const priceMatch = product.price <= maxPrice;

      return (
        categoryMatch &&
        genderMatch &&
        colorMatch &&
        sizeMatch &&
        brandMatch &&
        materialMatch &&
        priceMatch
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

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

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
    <div className="flex relative">
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white
          border-r border-gray-200 border-b-0
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

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className="flex-1 flex flex-col px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold px-8">All Products</h2>
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
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
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
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
