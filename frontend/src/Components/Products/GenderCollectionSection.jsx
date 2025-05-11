import React from 'react';
import { motion } from 'framer-motion';
import men from '../../assets/men.avif';
import women from '../../assets/women.jpg';
import children from '../../assets/children.avif';

const collections = [
  {
    title: 'Men',
    image: men,
    button: 'Shop Men',
  },
  {
    title: 'Women',
    image: women,
    button: 'Shop Women',
  },
  {
    title: 'Children',
    image: children,
    button: 'Shop Kids',
  },
];

const GenderCollectionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              className="relative w-full md:w-[32%] rounded-2xl overflow-hidden group shadow-lg transition-transform duration-500 hover:scale-[1.03] min-h-[400px] max-h-[500px] flex-grow"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white text-3xl font-semibold mb-4">
                  {item.title}
                </h3>
                <button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition">
                  {item.button}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
