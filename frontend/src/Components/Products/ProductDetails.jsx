import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineTag, AiOutlineBgColors } from 'react-icons/ai';
import { toast } from 'sonner';
import { FiMinus, FiPlus } from 'react-icons/fi';
import ProductGrid from './ProductGrid'; // You should define this if you want to show similar products

const selectedProduct = {
  name: 'UrbanEase Slim-Fit Shirt',
  price: 42.50,
  description:
    'A comfortable and stylish slim-fit shirt, perfect for everyday wear. Crafted from a breathable fabric that stays crisp throughout the day. Features a modern collar, subtle button placket, and a tailored back yoke.',
  color: ['#4A5568', '#EDF2F7', '#2B6CB0', '#805AD5'],
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
    images: [{ url: "https://picsum.photos/500/500?random=13" }],
  },
  {
    _id: 2,
    name: 'Another Great Shirt',
    price: 48.00,
    images: [{ url: "https://picsum.photos/500/500?random=14" }],
  },
  {
    _id: 3,
    name: 'Casual Cotton Tee',
    price: 22.75,
    images: [{ url: "https://picsum.photos/500/500?random=15" }],
  },
  {
    _id: 4,
    name: 'Premium Denim Shirt',
    price: 59.99,
    images: [{ url: "https://picsum.photos/500/500?random=16" }],
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img src={mainImage} alt="Main" className="w-full h-[500px] object-cover rounded-lg shadow" />
          <div className="flex gap-3 mt-4">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => handleImageSwitch(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${mainImage === img ? 'border-black' : 'border-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
          <p className="text-xl text-slate-700 mb-4">${selectedProduct.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

          <div className="mb-4">
            <h4 className="font-medium flex items-center gap-2 mb-2"><AiOutlineBgColors /> Color</h4>
            <div className="flex gap-3">
              {selectedProduct.color.map((clr, i) => (
                <button
                  key={i}
                  style={{ backgroundColor: clr }}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === clr ? 'border-black' : 'border-gray-300'}`}
                  onClick={() => handleColorSelect(clr)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium flex items-center gap-2 mb-2"><AiOutlineTag /> Size</h4>
            <div className="flex gap-3">
              {selectedProduct.size.map((sz, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition ${selectedSize === sz ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => handleSizeSelect(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button className="p-2" onClick={() => handleQuantityChange('decrease')}><FiMinus /></button>
              <span className="px-4">{quantity}</span>
              <button className="p-2" onClick={() => handleQuantityChange('increase')}><FiPlus /></button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={isLoading}
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            <AiOutlineShoppingCart className="inline-block mr-2" />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>

          {/* Extra Details */}
          <div className="mt-6 text-sm text-slate-500">
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Material:</strong> {selectedProduct.material}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <ProductGrid products={similarProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
