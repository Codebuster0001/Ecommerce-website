import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

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

  return (
    <div className="w-full px-6 bg-gray-900 text-white py-3 text-base shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left - Social Icons (hidden on small screens) */}
        <div className="hidden sm:flex items-center gap-4 text-lg">
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} {...link} />
          ))}
        </div>

        {/* Center - Message (always visible) */}
        <div className="text-center font-medium text-lg">
          🚚 Free Shipping on Orders Over $50!
        </div>

        {/* Right - Phone Number (hidden on small screens) */}
        <div className="hidden sm:block text-right font-medium text-lg">
          📞 +1 (800) 123‑4567
        </div>
      </div>
    </div>
  );
};

export default Topbar;
