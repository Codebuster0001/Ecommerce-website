import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utility function to format dates
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, []);

  // Fetching orders from a simulated API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate an API request
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            const mockOrders = [
              {
                _id: '1',
                createdAt: new Date(Date.now() - 86400000), // Yesterday
                shippingAddress: {
                  city: 'New York',
                  country: 'USA',
                  postalCode: '10001',
                  address: '123 Main St',
                },
                orderItems: [
                  {
                    name: 'Wireless Headphones (Black)',
                    image: 'https://picsum.photos/id/180/100/100',
                    quantity: 1,
                    price: 89.99,
                  },
                ],
                totalPrice: 89.99,
                isPaid: true,
                paidAt: new Date(Date.now() - 86000000),
                deliveryStatus: 'Delivered',
                deliveredAt: new Date(Date.now() - 20000000),
              },
              {
                _id: '2',
                createdAt: new Date(Date.now() - 172800000), // Two days ago
                shippingAddress: {
                  city: 'London',
                  country: 'UK',
                  postalCode: 'SW1A 0AA',
                  address: 'Buckingham Palace',
                },
                orderItems: [
                  {
                    name: 'Smart Watch (Silver)',
                    image: 'https://picsum.photos/id/201/100/100',
                    quantity: 1,
                    price: 129.99,
                  },
                  {
                    name: 'Extra Watch Strap (Leather)',
                    image: 'https://picsum.photos/id/202/50/50',
                    quantity: 2,
                    price: 15.00,
                  },
                ],
                totalPrice: 159.99,
                isPaid: false,
                deliveryStatus: 'Processing',
              },
            ];
            resolve(mockOrders);
          }, 1500)
        );

        setOrders(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders.');
        setLoading(false);
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Render item details
  const renderOrderItems = (orderItems) => {
    return orderItems.map((item) => (
      <div key={item.name} className="flex items-center space-x-2">
        <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded-md" />
        <span>{item.name}</span>
        {item.quantity > 1 && <span className="text-xs text-gray-500">x{item.quantity}</span>}
      </div>
    ));
  };

  // Render Payment Status
  const renderPaymentStatus = (isPaid, paidAt) => {
    return isPaid ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Not Paid
      </span>
    );
  };

  // Render Delivery Status
  const renderDeliveryStatus = (deliveryStatus, shippedAt, deliveredAt) => {
    let statusClass = 'bg-yellow-100 text-yellow-800'; // Default to "Processing"
    let displayStatus = deliveryStatus;

    if (deliveryStatus === 'Delivered') {
      statusClass = 'bg-green-100 text-green-800';
      displayStatus = 'Delivered';
    } else if (deliveryStatus === 'Shipped') {
      statusClass = 'bg-blue-100 text-blue-800';
      displayStatus = 'Shipped';
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
        {displayStatus}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>

        {loading ? (
          <div className="text-center py-8">
            <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-4.42 0-8 3.58-8 8z"></path>
            </svg>
            <p className="mt-2 text-gray-500">Loading your order history...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">No Orders Yet!</strong>
            <span className="block sm:inline">
              You haven't placed any orders.{' '}
              <Link to="/products" className="text-blue-500 hover:underline">
                Browse products now
              </Link>
              .
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{renderOrderItems(order.orderItems)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{renderPaymentStatus(order.isPaid, order.paidAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{renderDeliveryStatus(order.deliveryStatus, order.shippedAt, order.deliveredAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">View Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
