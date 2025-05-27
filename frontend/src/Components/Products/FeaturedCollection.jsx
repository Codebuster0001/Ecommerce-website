import React from "react";
import featureImage from "../../assets/featured.webp"; // Keep this, ensure correct path
import { Link } from "react-router-dom";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div
        className="container mx-auto flex  flex-col-reverse lg:flex-row items-center bg-green-50
rounded-3x1"
      >
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life
          </h2>{" "}
          
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <Link to="/collection/all" className="bg-black text-white py-3 text-lg px-6 rounded-lg hover:bg-gray-800 transition duration-300">
            Shop
          </Link>
        </div>
        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={featureImage}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-lg lg:rounded-br-lg "
          />
          </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
