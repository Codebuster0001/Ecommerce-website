import React from 'react';
import { FiCheckCircle, FiShoppingBag, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Make sure react-router-dom is set up

const checkout = {
  _id: "12323",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/500/500?random=19"
    },
    {
      productId: "2",
      name: "T-shirt",
      color: "black",
      size: "M",
      price: 200,
      quantity: 5,
      image: "https://picsum.photos/500/500?random=11"
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA"
  }
};

const OrderConfirmationPage = () => {
  const totalAmount = checkout.checkoutItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <FiCheckCircle className="text-green-500 text-5xl mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Order Confirmed</h1>
        <p className="text-gray-500 mt-2">Thank you for your purchase!</p>
      </div>

      {/* Order Info */}
      <div className="bg-gray-50 rounded-lg p-4 shadow-sm mb-6">
        <p className="text-sm text-gray-600"><strong>Order ID:</strong> {checkout._id}</p>
        <p className="text-sm text-gray-600"><strong>Order Date:</strong> {checkout.createdAt.toDateString()}</p>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center text-gray-800 font-semibold mb-2">
          <FiMapPin className="mr-2" />
          Shipping Address
        </div>
        <p className="text-sm text-gray-700">{checkout.shippingAddress.address}</p>
        <p className="text-sm text-gray-700">{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center text-gray-800 font-semibold mb-4">
          <FiShoppingBag className="mr-2" />
          Items in Your Order
        </div>

        {checkout.checkoutItems.map(item => (
          <div key={item.productId} className="flex items-center gap-4 border-b last:border-b-0 py-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">Color: {item.color} | Size: {item.size}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-gray-800 font-semibold">
              ${item.price * item.quantity}
            </div>
          </div>
        ))}

        <div className="text-right mt-4 text-lg font-bold text-gray-900">
          Total: ${totalAmount}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link
          to="/"
          className="px-6 py-2 text-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/my-orders"
          className="px-6 py-2 text-center rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
