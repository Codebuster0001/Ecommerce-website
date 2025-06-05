// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiShoppingBag, FiSearch, FiX } from "react-icons/fi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../features/cartSlice"; // Adjust path

const Navbar = () => {
  // Use Redux state for cart
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector(selectCartCount);

  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const cartDrawerRef = useRef(null);

  const logo = "Shopy";

  const navLinks = [
    { name: "MEN", to: "/collection?gender=men" },
    { name: "WOMEN", to: "/collection?gender=women" },
    { name: "KIDS", to: "/collection?gender=kids" },
  ];

  const toggleSearch = () => setShowSearch(!showSearch);
  const closeSearch = () => setShowSearch(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const handleClickOutsideMobileMenu = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutsideCartDrawer = (event) => {
      if (
        drawerOpen &&
        cartDrawerRef.current &&
        !cartDrawerRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Shopping Bag"]')
      ) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCartDrawer);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideCartDrawer);
  }, [drawerOpen]);

  // Get current path and query params for active link styling
  const location = useLocation();

  // Function to check if a nav link is active based on URL query params
  const isLinkActive = (linkTo) => {
    try {
      const url = new URL(linkTo, window.location.origin);
      const currentUrl = new URL(window.location.href);
      // Compare pathname and each search param key+value
      if (url.pathname !== currentUrl.pathname) return false;
      for (const [key, val] of url.searchParams) {
        if (currentUrl.searchParams.get(key) !== val) return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  return (
    <nav className="w-full bg-white px-6 py-4 z-50 relative shadow">
      <div className="mx-auto lg:px-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black">
          {logo}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 font-medium text-sm text-black tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`hover:text-gray-700 transition-colors ${
                    isLinkActive(link.to) ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {link.name}
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
              <div className="absolute right-7 w-64 -top-4 z-40">
                <div className="relative rounded p-2">
                  <SearchBar onSearch={closeSearch} />
                  <button
                    onClick={closeSearch}
                    className="absolute top-4 right-3 p-1 text-gray-600"
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

          {/* Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative"
            aria-label="Shopping Bag"
          >
            <FiShoppingBag className="cursor-pointer hover:text-black transition" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
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
        className={`fixed top-0 right-0 w-2/3 h-screen bg-white shadow-md transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
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
        <ul className="flex flex-col items-center mt-24 gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                onClick={toggleMobileMenu}
                className={`text-gray-800 hover:text-black ${
                  isLinkActive(link.to) ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Drawer */}
      <div ref={cartDrawerRef}>
        <CartDrawer
          drawerOpen={drawerOpen}
          toggleCartDrawer={toggleCartDrawer}
          cartItems={cartItems} // Pass real cart items
        />
      </div>
    </nav>
  );
};

export default Navbar;
