import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    // The main container for the grid. 'justify-center' is important for centering items.
    <div className="flex flex-wrap gap-4 w-full justify-center">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            // Adjusted widths for better responsiveness and overall card size
            // Added 'overflow-hidden' to ensure image scaling doesn't break layout
            // Enhanced shadow and hover effects
            className="flex-shrink-0 w-full sm:w-[calc(30%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(25%-1rem)] group rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Product Image Container */}
            <div className="w-full h-64 overflow-hidden rounded-t-lg"> {/* Reduced height slightly for a more compact look */}
              {product?.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name || 'Product Image'}
                  // Slightly increased scale on hover for a more noticeable effect
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-2 flex flex-col justify-between h-[calc(100%-16rem)]"> {/* Added flex for consistent spacing, adjusted height */}
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2"> {/* Reduced font size slightly, added line-clamp for multi-line titles */}
                {product.name}
              </h2>
              {product.brand && (
                <p className="text-sm text-gray-500 mt-1">{product.brand}</p> // Added brand if available
              )}
              <p className="text-xl font-bold text-indigo-600 mt-2"> {/* Stronger price emphasis */}
                ₹{product.price.toLocaleString()} {/* Added toLocaleString for price formatting */}
              </p>
              {/* Optional: Add a quick add to cart button or more details link here */}
              {/*
              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Details
              </button>
              */}
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full text-center py-10 text-gray-400 text-lg">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;