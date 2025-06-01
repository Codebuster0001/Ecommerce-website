import React from 'react';
import { Link } from 'react-router-dom';
import men from '../../assets/mens-collection.webp';
import women from '../../assets/womens-collection.webp';
import kids from '../../assets/kids.jpg';

const collections = [
  {
    title: 'Men',
    image:men,
      button: 'Shop Men',
    gender: 'men',
  },
  {
    title: 'Women',
      image:women, 
      button: 'Shop Women',
    gender: 'women',
  },
  {
    title: 'Children',
    image: kids,
    button: 'Shop Kids',
    gender: 'kids',
  },
];

const GenderCollectionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group shadow-xl transition-transform hover:scale-103 min-h-[350px] max-h-[450px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white text-3xl font-semibold mb-4">
                  {item.title}
                </h3>
                <Link
                  to={`/collections/all?gender=${encodeURIComponent(item.gender)}`}
                  className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition"
                >
                  {item.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
