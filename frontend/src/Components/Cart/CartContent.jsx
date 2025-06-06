import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cartSlice";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartContent = () => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();

  const getUniqueKey = (item) => `${item.id}-${item.size}-${item.color}`;

  const handleQuantityChange = (item, action) => {
    const key = getUniqueKey(item);
    if (action === "increase") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else if (action === "decrease") {
      dispatch(decreaseQuantity(key));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(getUniqueKey(item)));
  };

  return (
    <div className="p-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${index}`}
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
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="text-gray-500 text-xs mt-1">
                  Size: {item.size || "N/A"} | Color: {item.color || "N/A"}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item, "decrease")}
                    className="p-1 border rounded hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="px-2 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, "increase")}
                    className="p-1 border rounded hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="text-sm" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item)}
                className="absolute top-12 right-6 text-red-500 hover:text-red-700"
                aria-label="Remove item"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartContent;
