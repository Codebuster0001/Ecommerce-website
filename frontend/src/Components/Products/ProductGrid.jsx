import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300">
              {product?.images?.[0]?.url ? (
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name || "Product Image"}
                  className="w-full h-96 rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                <p className="text-lg font-bold text-gray-900">${product.price}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-4 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
