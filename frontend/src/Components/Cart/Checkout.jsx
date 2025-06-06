import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutData } from "../../features/checkoutSlice";
import { resetCart, selectCartItems } from "../../features/cartSlice";
import { toast } from "sonner";
import { useAuth } from "../Common/AuthContext";
import RazorpayButton from "../Cart/RazorpayButton";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const cartItems = useSelector(selectCartItems);
  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem("checkoutShippingAddress");
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
      localStorage.removeItem("checkoutShippingAddress");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("No products in your cart.");
      return;
    }

    if (!isLoggedIn) {
      toast.error("You must be logged in to continue.");
      localStorage.setItem(
        "checkoutShippingAddress",
        JSON.stringify(shippingAddress)
      );
      navigate(`/login?redirect=/checkout`);
      return;
    }

    if (Object.values(shippingAddress).some((val) => val.trim() === "")) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }

    setCheckoutId("order_" + Date.now());
  };

  const handlePaymentSuccess = (response) => {
    if (!response.razorpay_payment_id) {
      toast.error("Payment failed or cancelled.");
      return;
    }

    const fullCheckoutData = {
      orderId: checkoutId,
      createdAt: new Date().toISOString(),
      checkoutItems: cartItems,
      shippingAddress,
      totalPrice,
      isPaid: "Paid",
      paymentId: response.razorpay_payment_id,
    };

    dispatch(setCheckoutData(fullCheckoutData));
    dispatch(resetCart());
    localStorage.removeItem("cart");
    navigate("/order-confirmation");
  };

  const handleCashOnDelivery = () => {
    const fullCheckoutData = {
      orderId: checkoutId,
      createdAt: new Date().toISOString(),
      checkoutItems: cartItems,
      shippingAddress,
      totalPrice,
      isPaid: "Cash on Delivery",
      paymentId: "N/A",
    };

    dispatch(setCheckoutData(fullCheckoutData));
    dispatch(resetCart());
    localStorage.removeItem("cart");
    navigate("/order-confirmation");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-100 font-sans">
        <div className="max-w-xl w-full bg-white border rounded-lg shadow-md p-10 text-center text-gray-700 text-xl">
          No products in your cart.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-100 font-sans">
      <div className="max-w-6xl w-full bg-white border rounded-lg shadow-md p-6 md:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
          Checkout
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Left: Shipping Form */}
          <div className="md:w-3/5 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <input
              type="email"
              value={isLoggedIn ? "test@example.com" : ""}
              disabled
              className="mb-6 block w-full px-4 py-2 border rounded-md"
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h3>
            <form onSubmit={handleCreateCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={shippingAddress.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={shippingAddress.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-md"
                />
              </div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />

              {/* Payment Options */}
              <div className="mt-4">
                <h4 className="text-md font-medium text-gray-800 mb-2">
                  Select Payment Method
                </h4>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                    />
                    <span>Razorpay</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                {!checkoutId ? (
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
                  >
                    Continue to Payment
                  </button>
                ) : paymentMethod === "razorpay" ? (
                  <RazorpayButton
                    amount={totalPrice}
                    userDetails={shippingAddress}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) =>
                      toast.error("Payment failed: " + err.description)
                    }
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleCashOnDelivery}
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                  >
                    Place Order (COD)
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="md:w-2/5 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h3>
            {cartItems.map((product, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 mb-6 pb-4 border-b"
              >
                <img
                  src={product.image || "https://placehold.co/80"}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {product.size || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Color: {product.color || "-"}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between text-gray-700 text-base py-2">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-base py-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-xl pt-4 border-t mt-4">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
