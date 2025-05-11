import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const newArrivals = [
  {
    _id: 1,
    name: "V-Neck Wrap Top",
    price: "$50",
    image: [{ url: "https://picsum.photos/500/500?random=1", altText: "V-Neck Wrap Top" }],
  },
  {
    _id: 2,
    name: "High-Waisted Jeans",
    price: "$70",
    image: [{ url: "https://picsum.photos/500/500?random=3", altText: "High-Waisted Jeans" }],
  },
  {
    _id: 3,
    name: "Casual Sneakers",
    price: "$80",
    image: [{ url: "https://picsum.photos/500/500?random=5", altText: "Casual Sneakers" }],
  },
  {
    _id: 4,
    name: "Floral Maxi Dress",
    price: "$90",
    image: [{ url: "https://picsum.photos/500/500?random=7", altText: "Floral Maxi Dress" }],
  },
  {
    _id: 5,
    name: "Leather Jacket",
    price: "$120",
    image: [{ url: "https://picsum.photos/500/500?random=9", altText: "Leather Jacket" }],
  },
  {
    _id: 6,
    name: "Classic White Shirt",
    price: "$60",
    image: [{ url: "https://picsum.photos/500/500?random=11", altText: "Classic White Shirt" }],
  },
  {
    _id: 7,
    name: "Denim Jacket",
    price: "$85",
    image: [{ url: "https://picsum.photos/500/500?random=13", altText: "Denim Jacket" }],
  },
];

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse down handler to initiate dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Mouse move handler to scroll as dragging happens
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Mouse up or leave to end dragging
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Update scroll buttons visibility based on current scroll position
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > container.clientWidth + leftScroll;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  // Function to scroll left or right
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
        return () => {
            container.removeEventListener("scroll", updateScrollButtons);
        };
    }
  
    
  }, []);

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Explore New Arrivals</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the latest styles and trends. From everyday essentials to standout pieces.
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-end mb-4 space-x-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border text-gray-600 hover:bg-gray-200 transition ${!canScrollLeft && "opacity-50 cursor-not-allowed"}`}
            aria-label="Scroll left"
          >
            <AiOutlineLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border text-gray-600 hover:bg-gray-200 transition ${!canScrollRight && "opacity-50 cursor-not-allowed"}`}
            aria-label="Scroll right"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className={`flex space-x-6 overflow-x-auto scrollbar-hide py-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          
    
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((item) => (
            <div
              key={item._id}
              className="flex-none w-64 bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={item.image[0].url}
                alt={item.image[0].altText}
                className="w-full h-48 object-cover"
              />
              <Link to={`/products/${item._id}`}>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">{item.price}</p>
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
