import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoginImage from '../assets/login.webp'; // Adjust path accordingly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', delay: 2.4, stiffness: 80 }, // 1.4 + 1s delay
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-50 to-white">
      <motion.div
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Login Form */}
          <motion.div
            className="p-8 md:p-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-8 text-center">
              <Link to="/" className="text-3xl font-bold text-blue-600 tracking-tight">
                Shopy
              </Link>
            </div>

            <motion.h2
              className="text-2xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }} // +1s
            >
              Welcome Back!
            </motion.h2>

            <motion.p
              className="text-gray-600 mb-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }} // +1s
            >
              Please enter your credentials to sign in and explore our amazing products.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }} // +1s
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }} // +1s
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }} // +1s
              >
                <label className="flex items-center text-gray-600">
                  <input type="checkbox" className="form-checkbox text-blue-500 mr-2 rounded" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 200, delay: 2.4 }} // +1s
              >
                Sign In
              </motion.button>
            </form>

            <motion.p
              className="mt-8 text-sm text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6 }} // +1s
            >
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </Link>
            </motion.p>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            className="hidden md:block relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={LoginImage}
              alt="E-commerce Promotion"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-blue-900 opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <motion.h3
                className="text-2xl font-bold mb-2 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }} // +1s
              >
                Discover Amazing Deals
              </motion.h3>
              <motion.p
                className="text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }} // +1s
              >
                Explore a wide range of high-quality products at unbeatable prices.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
