import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AiOutlineShoppingCart,
  AiOutlineTag,
  AiOutlineBgColors,
  AiFillCheckCircle,
} from 'react-icons/ai';
import { toast } from 'sonner';

const selectedProduct = {
  name: 'V-Neck Wrap Top',
  price: 120,
  originalPrice: 150,
  description:
    'A stylish V-neck wrap top perfect for any occasion. The wrap design accentuates the waist, and the soft cotton fabric ensures all-day comfort.',
  brand: 'Zara',
  material: 'Cotton',
  size: ['S', 'M', 'L', 'XL', 'XXL'],
  color: ['Red', 'Blue', 'Green', 'Black', 'White'],
  images: [
    { url: 'https://picsum.photos/500/500?random=1', altText: 'Front view' },
    { url: 'https://picsum.photos/500/500?random=2', altText: 'Side view' },
  ],
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct.images[0].url);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color.');
      return;
    }

    setIsAddToCartLoading(true);

    setTimeout(() => {
      setIsAddToCartLoading(false);
      toast.success('Product added to cart!');
    }, 1500);
  };

  const isDisabled = !selectedSize || !selectedColor || isAddToCartLoading;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Thumbnail Images (Desktop) */}
        <div className="hidden md:flex flex-col space-y-4 w-24">
          {selectedProduct.images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img.url}
              alt={img.altText}
              onClick={() => setMainImage(img.url)}
              className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                img.url === mainImage
                  ? 'border-blue-500 shadow-lg'
                  : 'border-transparent hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>

        {/* Main Product Image */}
        <div className="flex-1 relative">
          <motion.img
            src={mainImage}
            alt="Main Product"
            className="w-full rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-auto gap-3 mt-4 snap-x">
            {selectedProduct.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.url}
                alt={img.altText}
                onClick={() => setMainImage(img.url)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 snap-start ${
                  img.url === mainImage
                    ? 'border-blue-500 shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="flex-1 space-y-6 text-gray-800">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold">{selectedProduct.name}</h2>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600">${selectedProduct.price}</span>
            <span className="line-through text-gray-400">${selectedProduct.originalPrice}</span>
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              {Math.round(
                ((selectedProduct.originalPrice - selectedProduct.price) /
                  selectedProduct.originalPrice) *
                  100
              )}
              % off
            </span>
          </div>

          {/* Description */}
          <p className="leading-relaxed">{selectedProduct.description}</p>

          {/* Brand & Material */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <AiOutlineTag className="text-blue-600" />
              <span className="font-medium">Brand:</span> {selectedProduct.brand}
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineBgColors className="text-blue-600" />
              <span className="font-medium">Material:</span> {selectedProduct.material}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex gap-3 flex-wrap">
              {selectedProduct.size.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border transition ${
                    selectedSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {size}
                  {selectedSize === size && (
                    <AiFillCheckCircle className="inline ml-2 text-white" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-2">Color:</h3>
            <div className="flex gap-3 flex-wrap">
              {selectedProduct.color.map((clr) => (
                <motion.button
                  key={clr}
                  onClick={() => setSelectedColor(clr)}
                  aria-label={`Select color ${clr}`}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === clr
                      ? 'ring-2 ring-blue-500'
                      : 'border-gray-300 hover:ring-2 hover:ring-gray-400'
                  }`}
                  style={{ backgroundColor: clr.toLowerCase() }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isDisabled}
              className={`w-full py-3 rounded-full font-semibold transition ${
                isDisabled
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAddToCartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
