import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion'; // ✅ motion added here

// Reusable SocialIcon Component
const SocialIcon = ({ icon, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color} transition-colors duration-300`}
  >
    {icon}
  </a>
);

const Topbar = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com', color: 'hover:text-blue-500' },
    { icon: <FaTwitter />, href: 'https://twitter.com', color: 'hover:text-sky-400' },
    { icon: <FaInstagram />, href: 'https://instagram.com', color: 'hover:text-pink-500' },
  ];

  const messages = [
    "🚚 Free Shipping on Orders Over $50!",
    "🎁 Get 10% Off on Your First Purchase!",
    "🔥 Limited Time Offer: Buy 1 Get 1 Free!",
    "📦 Fast & Secure Delivery Guaranteed!",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 bg-gray-900 text-white py-3 text-base shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left - Social Icons */}
        <div className="hidden sm:flex items-center gap-4 text-lg">
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} {...link} />
          ))}
        </div>

        {/* Center - Animated Message */}
        <div className="text-center font-medium text-lg h-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {messages[messageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right - Phone Number */}
        <div className="hidden sm:block text-right font-medium text-lg">
          📞 +1 (800) 123‑4567
        </div>
      </div>
    </div>
  );
};

export default Topbar;
