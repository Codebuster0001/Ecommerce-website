import React from "react";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi2";

const FeatureSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-blue-100">
            <HiShoppingBag className="text-xl text-blue-500" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 tracking-tight mb-2">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders over $100.00
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-yellow-100">
            <HiArrowPathRoundedSquare className="text-xl text-yellow-500" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 tracking-tight mb-2">
            45-DAY MONEY BACK GUARANTEE
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            If you're not satisfied, get a full refund
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-red-100">
            <HiOutlineCreditCard className="text-xl text-red-500" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 tracking-tight mb-2">
            SECURE ONLINE PAYMENT
          </h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            We accept all major credit cards
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
