import React, { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import p1 from "../../assets/p1.webp";
import p2 from "../../assets/p2-1.webp";

const CartContent = () => {
  const [cartProducts, setCartProducts] = useState([
    {
      productId: 1,
      name: "T-Shirt",
      quantity: 2,
      size: "M",
      color: "Red",
      price: 19.99,
      image: p1,
      description: "A comfortable cotton t-shirt.",
    },
    {
      productId: 2,
      name: "Jeans",
      quantity: 1,
      size: "L",
      color: "Blue",
      price: 39.99,
      image: p2,
      description: "Stylish denim jeans.",
    },
  ]);

  const handleQuantityChange = (productId, action) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((item) => item.productId !== productId)
    );
  };

  return (
    <>
      {cartProducts.map((item) => (
        <div
          key={item.productId}
          className="flex items-center gap-4 p-3 shadow-sm border rounded-md relative"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-contain rounded-md border"
          />
          <div className="flex flex-col flex-1 text-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="font-medium text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="text-gray-500 text-xs mt-1">
              Size: {item.size} | Color: {item.color}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.productId, "decrease")}
                className="p-1 border rounded hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                <FiMinus className="text-sm" />
              </button>
              <span className="px-2 text-sm">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.productId, "increase")}
                className="p-1 border rounded hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <FiPlus className="text-sm" />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveItem(item.productId)}
            className="absolute top-12 right-6 text-red-500 hover:text-red-700"
            aria-label="Remove item"
          >
            <FiTrash2 className="text-lg" />
          </button>
        </div>
      ))}

      {cartProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
      )}
    </>
  );
};

export default CartContent;