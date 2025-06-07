import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  selectOrders,
  cleanOldDeliveredOrders,
  loadOrdersFromStorage,
} from "../features/checkoutSlice";
import { toast } from "sonner";
import { addToCart } from "../features/cartSlice";
import debounce from "lodash.debounce";

const PAGE_SIZE = 5;

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrders = useSelector(selectOrders) || [];

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(search);
  const [paymentTypeFilter, setPaymentTypeFilter] = useState(searchParams.get("payment") || "All");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    dispatch(loadOrdersFromStorage());
    dispatch(cleanOldDeliveredOrders());
  }, [dispatch]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (paymentTypeFilter !== "All") params.set("payment", paymentTypeFilter);
    if (page !== 1) params.set("page", page);
    setSearchParams(params);
  }, [search, paymentTypeFilter, page, setSearchParams]);

  // Debounce search input
  useEffect(() => {
    const debounced = debounce(() => {
      setSearch(searchInput);
      setPage(1); // Reset page on new search
    }, 500);

    debounced();
    return () => debounced.cancel();
  }, [searchInput]);

  useEffect(() => {
    setPage(1); // Reset page when payment filter changes
  }, [paymentTypeFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Paid":
        return "text-green-600 bg-green-100";
      case "Cash on Delivery":
        return "text-blue-600 bg-blue-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const filteredAndSortedOrders = allOrders
    .filter((order) => {
      const isConfirmedPayment =
        order.isPaid === "Paid" || order.isPaid === "Cash on Delivery";
      if (!isConfirmedPayment) return false;

      const searchTerm = search.toLowerCase();
      const matchesOrderIdOrCity =
        order.orderId?.toString().toLowerCase().includes(searchTerm) ||
        order.shippingAddress?.city?.toLowerCase().includes(searchTerm);

      const matchesProductName = order.checkoutItems?.some(item =>
        item.name?.toLowerCase().includes(searchTerm)
      );

      const matchesSearch = matchesOrderIdOrCity || matchesProductName;
      const matchesPaymentType =
        paymentTypeFilter === "All" || order.isPaid === paymentTypeFilter;

      return matchesSearch && matchesPaymentType;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filteredAndSortedOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const exportToCSV = () => {
    if (filteredAndSortedOrders.length === 0) {
      toast.error("No orders to export");
      return;
    }

    const header = [
      "Order ID",
      "Date",
      "City",
      "Country",
      "Items Count",
      "Total Price",
      "Payment Type",
    ];

    const rows = filteredAndSortedOrders.map((order) => [
      order.orderId,
      new Date(order.createdAt).toLocaleString(),
      order.shippingAddress?.city || "N/A",
      order.shippingAddress?.country || "N/A",
      order.checkoutItems?.length || 0,
      order.totalPrice?.toFixed(2) || "0.00",
      order.isPaid || "Unknown",
    ]);

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReorder = (orderItems) => {
    if (!orderItems || orderItems.length === 0) {
      toast.error("No items to reorder");
      return;
    }
    orderItems.forEach((item) => {
      dispatch(
        addToCart({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity || 1,
          size: item.size,
          color: item.color,
        })
      );
    });
    toast.success("Order items added to cart");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by Order ID, City, or Product Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-64"
        />

        <select
          value={paymentTypeFilter}
          onChange={(e) => setPaymentTypeFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Payment Types</option>
          <option value="Paid">Paid (Razorpay)</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Export CSV
        </button>
      </div>

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
              <th className="px-6 py-3">Payment Type</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No matching orders found.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => {
                const firstItem = order.checkoutItems?.[0];

                return (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(order.orderId)}
                  >
                    <td className="px-6 py-4 text-center">
                      {firstItem ? (
                        <img
                          src={firstItem.image || "https://placehold.co/80"}
                          alt={firstItem.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/80";
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">#{order.orderId}</td>
                    <td className="px-6 py-4 text-center">
                      {new Date(order.createdAt).toLocaleDateString()}{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.country}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.checkoutItems?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-center">
                      ₹{order.totalPrice?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          order.isPaid || "Unknown"
                        )}`}
                      >
                        {order.isPaid || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReorder(order.checkoutItems);
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-xs"
                        title="Reorder"
                      >
                        Reorder
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
