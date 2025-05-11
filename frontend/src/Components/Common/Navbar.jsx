import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiShoppingBag, FiSearch, FiX } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { logo } from "../../data/products";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer"; // <- Added import

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // <- Cart state
  const mobileMenuRef = useRef(null);

  const navLinks = ["MEN", "WOMEN", "TOP WEAR", "BOTTOM WEAR"];

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => setShowSearch(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen); // <- Cart toggle function

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Dummy cart items
  const cartItems = [
    { name: "T-Shirt", quantity: 2, price: 19.99 },
    { name: "Jeans", quantity: 1, price: 39.99 },
  ];

  return (
    <nav className="w-full bg-white px-6 py-4 z-50 relative">
      <div className="mx-auto lg:px-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">{logo}</Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 font-medium text-sm text-black tracking-wide">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-700 transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl text-gray-800 relative">
          {/* Search */}
          <div className="relative hidden md:block">
            <button onClick={toggleSearch} aria-label="Search">
              <FiSearch className="cursor-pointer hover:text-black transition" />
            </button>
            {showSearch && (
              <div className="absolute right-8 w-64 -top-2 z-40 transition-all duration-300 ease-in-out">
                <div className="relative">
                  <SearchBar onSearch={closeSearch} />
                  <button
                    onClick={closeSearch}
                    className="absolute top-2 right-2 p-1 text-gray-600"
                    aria-label="Close Search"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <Link to="/profile" aria-label="Profile">
            <FiUser className="cursor-pointer hover:text-black transition" />
          </Link>

          {/* Shopping Bag */}
          <button onClick={toggleCartDrawer} className="relative" aria-label="Shopping Bag">
            <FiShoppingBag className="cursor-pointer hover:text-black transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartItems.length}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-xl p-1"
            aria-label="Menu"
          >
            <HiBars3BottomRight className="cursor-pointer hover:text-black transition" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-12 right-0 w-2/3 h-screen bg-white shadow-md transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-5 right-7 text-2xl text-gray-800"
          aria-label="Close Menu"
        >
          <FiX />
        </button>
        <ul className="flex flex-col items-stretch mt-12">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-4 px-6 block font-semibold text-center"
                onClick={toggleMobileMenu}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
        cartItems={cartItems}
      />
    </nav>
  );
};

export default Navbar;
