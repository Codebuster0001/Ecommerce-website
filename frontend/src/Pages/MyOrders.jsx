import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      const mockOrders = [
        {
          _id: "1315163",
          createdAt: new Date().toLocaleDateString(),
          shippingAddress: { city: "Cityville", country: "Countryland" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=16",
            },
          ],
          totalPrice: 60,
          isPaid: "Processing",
        },
        {
          _id: "25654646",
          createdAt: new Date().toLocaleDateString(),
          shippingAddress: { city: "Cityville", country: "Countryland" },
          orderItems: [
            {
              name: "Product 3",
              image: "https://picsum.photos/500/500?random=19",
            },
          ],
          totalPrice: 60,
          isPaid: "Paid",
        },
        {
          _id: "98374592",
          createdAt: new Date().toLocaleDateString(),
          shippingAddress: { city: "Townland", country: "Nationia" },
          orderItems: [
            {
              name: "Product X",
              image: "https://picsum.photos/500/500?random=23",
            },
          ],
          totalPrice: 90,
          isPaid: "Cancelled",
        },
      ];

      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 2000); // Simulate 2-second loading
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Paid":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      <div className="relative overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 text-center">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Shipping Address</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">#{order._id}</td>
                  <td className="px-6 py-4 text-center">{new Date(order.createdAt).toLocaleDateString() } {""}
                     {new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td className="px-6 py-4 text-center">
                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">{order.orderItems.length}</td>
                  <td className="px-6 py-4 text-center">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        order.isPaid
                      )}`}
                    >
                      {order.isPaid}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            
            
    </div>
  );
};

export default MyOrders;
