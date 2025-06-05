import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            {product?.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name || 'Product Image'}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Product Details */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-medium text-gray-800 truncate">
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-black">
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-gray-400 text-lg">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
