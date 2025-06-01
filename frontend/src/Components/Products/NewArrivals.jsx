import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import products from "../../data/products"; // Ensure this is the correct path

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.classList.add("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > container.clientWidth + leftScroll;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    } else {
      setShowScrollButtons(false);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      updateScrollButtons();
      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  return (
    <section className="py-16 px-4 mb-3">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-3">Explore New Arrivals</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Explore our newest collection of stylish items, carefully curated for you. Discover high-quality pieces designed for modern living.
          </p>
        </div>

        {showScrollButtons && (
          <div className="flex justify-center md:justify-end mb-4 space-x-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 border border-slate-300 text-slate-600 hover:bg-slate-200 transition rounded-md ${!canScrollLeft && "opacity-50 cursor-not-allowed"}`}
              aria-label="Scroll left"
            >
              <AiOutlineLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3 border border-slate-300 text-slate-600 hover:bg-slate-200 transition rounded-md ${!canScrollRight && "opacity-50 cursor-not-allowed"}`}
              aria-label="Scroll right"
            >
              <AiOutlineRight size={24} />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="relative flex space-x-6 overflow-x-auto scrollbar-hide py-4 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {products.map((item) => (
            <div
              key={item._id}
              className="flex-none w-80 bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden snap-start border border-slate-200"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={item.images[0].url}
                alt={item.images[0].altText}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <Link to={`/products/${item._id}`} className="block">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 truncate">{item.name}</h3>
                  <p className="text-slate-500 text-base">${item.discountPrice ?? item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
