import React from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetails from "../Components/Products/ProductDetails";
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

const Home = () => {
  const validProducts = Array.isArray(productsData.products)
    ? productsData.products
    : placeholderProducts;

  return (
    <div>
      <Hero />
      <GenderCollectionSection />

      {/* New Arrivals */}
      <NewArrivals products={validProducts} />

      {/* Best Seller - Rotating One Product */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
        Best Seller
      </h2>
      <ProductDetails products={validProducts.slice(0, 1)} />

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
