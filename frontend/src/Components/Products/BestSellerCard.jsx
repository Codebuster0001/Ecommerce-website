import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineTag,
  AiOutlineBgColors,
} from "react-icons/ai";

const BestSellerCard = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images?.[0]?.url);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id || product.id}`);
  };

  return (
    <div
      className="max-w-6xl mx-auto px-6 pb-20 py-12 rounded-xl transition cursor-pointer "
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image with thumbnails */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || `Thumb ${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMainImage(img.url);
                }}
                className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="text-lg">
          <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
          <p className="text-2xl text-slate-800 mb-5">
            ₹{product.discountPrice || product.price}
          </p>
          <p className="text-base text-gray-700 mb-6">{product.description}</p>

          {/* Color Info */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <AiOutlineBgColors size={24} /> Colors Available
              </h4>
              <div className="flex gap-4">
                {product.colors.map((clr, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-gray-500"
                    style={{ backgroundColor: clr.toLowerCase() }}
                    title={clr}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Info */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <AiOutlineTag size={24} /> Sizes Available
              </h4>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((sz, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border rounded-md text-base font-medium bg-gray-100"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Brand/Material */}
          <div className="mt-8 text-lg text-slate-600 space-y-2">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
          </div>

          {/* Add to Cart Indicator */}
          <div className="mt-8">
            <button className="bg-black text-white px-6 py-3 text-lg rounded-lg inline-flex items-center gap-3 hover:bg-gray-800">
              <AiOutlineShoppingCart size={22} />
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
