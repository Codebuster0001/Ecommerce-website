// ProductDetails.jsx
import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineTag, AiOutlineBgColors } from 'react-icons/ai';
import { toast } from 'sonner';
import { FiMinus, FiPlus } from 'react-icons/fi';
import ProductGrid from './ProductGrid';

const selectedProduct = {
  name: 'UrbanEase Slim-Fit Shirt',
  price: 42.50,
  description:
    'A comfortable and stylish slim-fit shirt, perfect for everyday wear. Crafted from a breathable fabric that stays crisp throughout the day. Features a modern collar, subtle button placket, and a tailored back yoke.',
  color: ['#4A5568', '#EDF2F7', '#2B6CB0', '#805AD5'], // Darker, muted palette
  size: ['XS', 'S', 'M', 'L', 'XL'],
  brand: 'UrbanEase Outfitters',
  material: 'SoftBlend Cotton',
  images: [
    "https://picsum.photos/500/500?random=11",
    "https://picsum.photos/500/500?random=12",
  ],
};
const similarProducts = [
  {
    _id: 1,
    name: 'Similar Product 1',
    price: 35.00,
    images: [
      { url: "https://picsum.photos/500/500?random=13" }],
  },
  {
    _id: 2,
    name: 'Another Great Shirt',
    price: 48.00,
    images: [
      { url: "https://picsum.photos/500/500?random=14" }],
  },
  {
    _id: 3,
    name: 'Casual Cotton Tee',
    price: 22.75,
    images: [
      { url: "https://picsum.photos/500/500?random=15" }],
  },
  {
    _id: 4,
    name: 'Premium Denim Shirt',
    price: 59.99,
    images: [
      { url: "https://picsum.photos/500/500?random=16" }],
  },
];

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(selectedProduct.images[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setSelectedColor(null);
      setSelectedSize(null);
      setIsLoading(false);
      toast.success(`${quantity} item(s) added to your cart!`);
    }, 1000);
  };

  const handleImageSwitch = (image) => {
    setMainImage(image);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image Section */}
          <div className="md:w-1/2 flex flex-col md:flex-row gap-2 lg:gap-3 items-start"> {/* Further reduced gap */}
            {/* Image thumbnails */}
            <div className="md:w-1/4 flex flex-row md:flex-col gap-1 lg:items-end "> {/* Further reduced gap */}
              {selectedProduct.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center rounded-md overflow-hidden cursor-pointer border-2 transition-all border-transparent hover:border-gray-400 ${
                    mainImage === image ? 'border-indigo-500' : ''
                  }`}
                  onClick={() => handleImageSwitch(image)}
                  onMouseEnter={() => handleImageSwitch(image)} // Added for better UX
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-2/3">
              <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={mainImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-gray-900">{selectedProduct.name}</h1>
              <p className="text-xl text-indigo-600 font-semibold">${selectedProduct.price.toFixed(2)}</p>
              <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
            </div>

            {/* Color and Size Selection - Horizontal Layout */}
            <div className="flex flex-col gap-4">
              {/* Color Selection */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Color Options:</h2>
                <div className="flex items-center gap-3">
                  {selectedProduct.color.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all transform hover:scale-110 focus:outline-none ${
                        selectedColor === color ? 'border-indigo-500 shadow-md' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Size:</h2>
                <div className="flex items-center gap-3">
                  {selectedProduct.size.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-4 py-2 rounded-md font-medium text-gray-800 border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                        selectedSize === size ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm' : 'bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart - Horizontal Layout */}
            <div className="flex items-center gap-6">
              {/* Quantity Selection */}
              <div className="flex items-center gap-3">
                <label htmlFor="quantity" className="text-lg font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="px-3 py-2 hover:bg-gray-200 focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="text-sm text-gray-600" />
                  </button>
                  <span id="quantity" className="px-4 py-2 text-lg text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="px-3 py-2 hover:bg-gray-200 focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="text-sm text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-grow py-3 bg-indigo-600 text-white rounded-md text-lg font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add to Cart'}
                <AiOutlineShoppingCart className="inline ml-2" />
              </button>
            </div>

            {/* Product Characteristics - Collapsed Presentation */}
            <details className="border-t border-gray-200 pt-6" open>
              <summary className="text-lg font-semibold text-gray-900 cursor-pointer ">
                Product Details
              </summary>
              <div className="mt-4 space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <AiOutlineTag className="text-gray-500 text-xl" />
                  <span>Brand: <span className="font-medium">{selectedProduct.brand}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <AiOutlineBgColors className="text-gray-500 text-xl" />
                  <span>Material: <span className="font-medium">{selectedProduct.material}</span></span>
                </div>
              </div>
            </details>
          </div>
        </div>
        <div className='mt-20'>
          <h2 className='text-2xl lg:text-3xl  text-center font-medium mb-4'>You May Also Like</h2>
        <div className=' px-8 lg:px-16 '>
            <ProductGrid products={similarProducts} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;