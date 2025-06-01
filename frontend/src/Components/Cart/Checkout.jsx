import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// Placeholder image for the product, as the original p1 import won't work directly
const PRODUCT_IMAGE_PLACEHOLDER =
  "https://placehold.co/80x80/E0E0E0/333333?text=Product";

// Your cart object (You may later want to get this dynamically)
const cart = {
  products: [
    {
      name: "Classic Oxford Button-Down Shirt",
      price: 39.99,
      size: "S",
      color: "Red",
      image: PRODUCT_IMAGE_PLACEHOLDER, // Using placeholder image
    },
  ],
  // subtotal and shipping removed
  totalPrice: 39.99,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checoutId, setCheckoutId] = useState(null);
  // State for shipping address details
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Function to handle form submission
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    // Here you would typically send the shippingAddress to your backend
    // For now, we'll just simulate a checkout ID
    setCheckoutId(123);
    
  };

  // Function to handle payment success
  const handlePaymentSucess = (deatils) => {
    console.log(deatils);
    
    navigate("/order-confirmation")
    
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full border bg-white rounded-lg p-8 md:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
          CHECKOUT
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Left Column: Contact Details and Delivery Form */}
          <div className="md:w-3/5 mb-8 md:mb-0">
            {/* Contact Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Details
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  value="admin@example.com"
                  disabled
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Delivery Form Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delivery
              </h3>
              <form onSubmit={handleCreateCheckout} className="space-y-5">
                {/* First Name & Last Name */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-5 sm:space-y-0">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          firstName: e.target.value,
                        })
                      }
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          lastName: e.target.value,
                        })
                      }
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* City & Postal Code */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-5 sm:space-y-0">
                  <div className="flex-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        })
                      }
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Continue to Payment Button */}
                <div className="mt-6">
                  {!checoutId ? (
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
                    >
                      Continue to Payment
                    </button>
                  ) : (
                    <div className="flex items-center justify-center " >
                      
                     <button
                      onClick={handlePaymentSucess}
                     className="text-center bg-black text-white  rounded-md w-full py-2 hover:bg-gray-900 hover:text-gray-400 ">
                          Pay Now
                     </button>
                  
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="md:w-2/5 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h3>
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/80x80/E0E0E0/333333?text=Error";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-lg">
                    {product.name}
                    </p>
                    <p className="text-sm text-gray-600">Size: {product.size}</p>
                    <p className="text-sm text-gray-600">
                    Color: {product.color}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    &#8377;{product.price.toFixed(2)}
                  </p>
                  </div>
                ))}

                {/* Subtotal and Shipping */}
                <div className="flex justify-between text-gray-700 text-base py-2">
                  <span>Subtotal</span>
                  <span>
                  &#8377;
                  {cart.products
                    .reduce((sum, p) => sum + p.price, 0)
                    .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 text-base py-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                
            <div className="flex justify-between font-bold text-gray-900 text-xl pt-4 border-t border-gray-200 mt-4">
              <span>Total</span>
              <span>&#8377;{cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
