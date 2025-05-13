import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { name: "Men's Top Wear", to: "#" },
    { name: "Women's Top Wear", to: "#" },
    { name: "Men's Bottom Wear", to: "#" },
    { name: "Women's Bottom Wear", to: "#" },
  ];

  const supportLinks = [
    { name: 'Contact Us', to: '#' },
    { name: 'About Us', to: '#' },
    { name: 'FAQs', to: '#' },
    { name: 'Features', to: '#' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, color: 'text-blue-600', hoverColor: 'hover:text-blue-700', label: 'Facebook', to: '#' },
    { icon: <FaInstagram />, color: 'text-pink-600', hoverColor: 'hover:text-pink-700', label: 'Instagram', to: '#' },
    { icon: <FaTwitter />, color: 'text-sky-500', hoverColor: 'hover:text-sky-600', label: 'Twitter', to: '#' },
  ];

  return (
    <footer className=" text-gray-700 py-16 mt-10">
      {/* Main Flex Container */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Newsletter */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h2>
          <p className="text-sm text-gray-600 mb-2">Stay up to date on new arrivals and exclusive offers.</p>
          <p className="text-sm text-gray-600 mb-4">Sign up and get <strong className="font-semibold">10% off</strong> your first order.</p>
          <div className="flex rounded-md overflow-hidden max-w-md">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gray-900 text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop</h2>
          <ul className="text-sm space-y-2">
            {shopLinks.map(({ name, to }) => (
              <li key={name}>
                <Link to={to} className="hover:text-blue-600 transition-colors">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Support</h2>
          <ul className="text-sm space-y-2">
            {supportLinks.map(({ name, to }) => (
              <li key={name}>
                <Link to={to} className="hover:text-blue-600 transition-colors">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h2>
          <div className="flex items-center space-x-4 mb-4">
            {socialLinks.map(({ icon, color, hoverColor, label, to }) => (
              <Link
                key={label}
                to={to}
                className={`${color} ${hoverColor} transition-colors`}
                aria-label={label}
              >
                {icon}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
            <p className="flex items-center text-sm text-gray-800">
              <FaPhone className="mr-2 text-green-500" />
              <span>0123-456-789</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
        © {currentYear} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
