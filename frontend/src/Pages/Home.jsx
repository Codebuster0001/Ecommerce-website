import React, { useState, useEffect } from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import BestSellerCard from "../Components/Products/BestSellerCard"; // adjust path if necessary

import ProductGrid from "../Components/Products/ProductGrid";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import FeatureSection from "../Components/Products/FeatureSection";
import productsData from "../data/products";

const placeholderProducts = [
  {
    _id: "placeholder1",
    name: "Placeholder Product",
    images: [
      {
        url: "https://via.placeholder.com/300x200",
        altText: "Placeholder",
      },
    ],
    price: 50,
    category: "placeholder",
    colors: ["Black"],
    sizes: ["M"],
    description: "This is a placeholder product",
    brand: "Placeholder Brand",
    material: "N/A",
  },
];

// Convert products object to array safely
const productsArray = Array.isArray(productsData.products)
  ? productsData.products
  : Object.values(productsData.products || {});

const validProducts = productsArray.length > 0 ? productsArray : placeholderProducts;

const Home = () => {
  // List of best sellers, you can customize this list
  // For demo, let's take first 3 products as best sellers
  const bestSellers = validProducts.slice(0, 3);

  // State to keep track of which product to show
  const [currentBestSellerIndex, setCurrentBestSellerIndex] = useState(0);

  // Change best seller every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBestSellerIndex((prevIndex) =>
        prevIndex + 1 >= bestSellers.length ? 0 : prevIndex + 1
      );
    }, 10000); // 10000 ms = 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [bestSellers.length]);

  // Current product to display as best seller
  const currentBestSeller = bestSellers[currentBestSellerIndex];

  return (
    <div>
      <Hero />
      <GenderCollectionSection />

      {/* New Arrivals */}
      <NewArrivals products={validProducts.slice(0, 10)} />

      {/* Best Seller - Show one product, rotating every 10s */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
        Best Seller
      </h2>
    {currentBestSeller ? (
  <BestSellerCard product={currentBestSeller} />
) : (
  <p className="text-center text-gray-600">No best seller available</p>
)}

      {/* Women’s Top Wear - Show 12 */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          Tops Wear for Women's
        </h2>
        <ProductGrid products={validProducts.slice(0, 12)} />
      </div>

      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;
