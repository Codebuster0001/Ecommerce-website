import React from "react";
import { FiX } from "react-icons/fi";

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} aria-label="Close Cart">
          <FiX className="text-xl text-gray-700" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-4 text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <ul className="p-4 space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="p-4 border-t">
        <button
          onClick={() => alert("Proceeding to checkout...")}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
