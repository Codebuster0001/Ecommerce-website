import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import heroImage from '../../assets/p3.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
  const headingText = 'Spending Smarter is Now Your Habit';
  const paragraphText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices pretium.';

  const buttonStyle = 'py-3 px-6 rounded-full font-semibold transition-colors';

  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 1,
    triggerOnce: false,
  });

  const textAnimation = useAnimation();
  const imageAnimation = useAnimation();

  useEffect(() => {
    if (isInView) {
      textAnimation.start({ opacity: 1, x: -1, transition: { duration: 2.5 } });
      imageAnimation.start({ opacity: 1, x: -1, transition: { duration: 2.5} });
    } else {
      textAnimation.start({ opacity: 0, x: -70 });
      imageAnimation.start({ opacity: 0, x: 90 });
    }
  }, [isInView, textAnimation, imageAnimation]);

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-white to-gray-50 py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 flex flex-col items-center text-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={textAnimation}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {headingText}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            {paragraphText}
          </p>
          <div className="flex flex-col items-center w-[35%]">
            <Link
              to="/products"
              className={`${buttonStyle} bg-gray-900 text-white hover:bg-gray-800`}
            >
              Shop Now
            </Link>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={imageAnimation}
        >
          <div className="relative rounded-full overflow-hidden w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] lg:w-[400px] lg:h-[500px] border-2 border-gray-200 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gray-800/20 rounded-full border-4 border-gray-700/50" />
            </div>
            <img
              src={heroImage}
              alt="Hero Visual"
              className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
