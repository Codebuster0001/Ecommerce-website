import React from 'react';
import Hero from '../Components/Layout/Hero';
import GenderCollectionSection from '../Components/Products/GenderCollectionSection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';
import ProductGrid from '../Components/Products/ProductGrid';
import FeaturedCollection from '../Components/Products/FeaturedCollection';
import FeatureSection from '../Components/Products/FeatureSection';

const placeholderProducts = [
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
  {
    _id: 5,
    name: 'Stylish Blouse',
    price: 45.00,
    images: [
      { url: "https://picsum.photos/500/500?random=17" }],
  },
  {
    _id: 6,
    name: 'Elegant Dress',
    price: 89.99,
    images: [
      { url: "https://picsum.photos/500/500?random=18" }],
  },
  {
    _id: 7,
    name: 'Trendy Jacket',
    price: 120.00,
    images: [
      { url: "https://picsum.photos/500/500?random=19" }],
  },
  {
    _id: 8,
    name: 'Classic Trousers',
    price: 55.00,
    images: [
      { url: "https://picsum.photos/500/500?random=20" }],
  },
];

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      {/**Best seller */}
      <h2 className='text-3xl font-bold text-center text-gray-900 mb-14'>
        Best Seller
      </h2>
      

      <ProductDetails  />
    

      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center text-gray-900 mb-14'>
          Tops Wear for Women's
        </h2>
        <ProductGrid products={placeholderProducts}/>
      </div>
      <FeaturedCollection/>
      <FeatureSection/>
    </div>
  );
};

export default Home;