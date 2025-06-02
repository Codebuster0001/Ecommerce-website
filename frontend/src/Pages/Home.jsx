import React from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
import ProductGrid from "../Components/Products/ProductGrid";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import FeatureSection from "../Components/Products/FeatureSection";
import products from "../data/products";

const placeholderProducts = [
  {
    _id: "placeholder1",
    name: "Placeholder Product",
    images: [{ url: "https://via.placeholder.com/300x200", altText: "Placeholder" }],
    price: 50,
    category: "placeholder",
    colors: ["Black"],
    sizes: ["M"],
    description: "This is a placeholder product",
    brand: "Placeholder Brand",
    material: "N/A",
  },
];

const Home = () => {
  const validProducts = Array.isArray(products) ? products : placeholderProducts;

  return (
    <div>
      <Hero />
      <GenderCollectionSection />

      {/* New Arrivals Section */}
      <NewArrivals products={validProducts} />

      {/* Best Seller */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">Best Seller</h2>
      <ProductDetails />

      {/* Women's Top Wear */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          Tops Wear for Women's
        </h2>
        <ProductGrid products={validProducts} />
      </div>

      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;
