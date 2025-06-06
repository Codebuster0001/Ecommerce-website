import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import { loadCheckoutFromStorage } from "../features/checkoutSlice";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  
  const checkoutData = useSelector((state) => state.checkout.checkoutInfo);
  const pdfRef = useRef();

  useEffect(() => {
    dispatch(loadCheckoutFromStorage());
    localStorage.removeItem("orderCompleted"); // ✅ clear order completion flag
  }, [dispatch]);

  const {
    checkoutItems: orderItems = [],
    shippingAddress = {},
    orderId = "N/A",
    createdAt = "",
    totalPrice = 0,
    isPaid = "Paid",
  } = checkoutData || {};

  const totalAmount =
    totalPrice ||
    orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order_${orderId}.pdf`);
  };

  if (!checkoutData) {
    return (
      <div className="text-center py-10 text-gray-500">
        No order data available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center mb-6">
        <FaCheckCircle className="text-green-500 text-6xl mb-2" />
        <h1 className="text-3xl font-bold text-green-600">Order Confirmed</h1>
        <p className="text-gray-600">Thank you for your purchase!</p>
      </div>

      <div ref={pdfRef} className="bg-white p-6 rounded shadow mt-4">
        <p>
          <strong>Order ID:</strong> #{orderId}
        </p>
        <p>
          <strong>Status:</strong> {isPaid}
        </p>
        <p>
          <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Shipping Address:</strong>{" "}
          {shippingAddress.address}, {shippingAddress.city},{" "}
          {shippingAddress.country}
        </p>

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-2">Items:</h2>
        {orderItems.length === 0 ? (
          <p className="text-gray-500">No items in this order.</p>
        ) : (
          orderItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item?.image || "https://placehold.co/80"}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/80";
                  }}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} | Size: {item.size || "-"} | Color:{" "}
                    {item.color || "-"}
                  </p>
                </div>
              </div>
              <div className="font-semibold text-right">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))
        )}

        <div className="text-right mt-4 font-bold text-lg">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FaDownload /> Download Invoice
        </button>

        <Link
          to="/myorders"
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
        >
          View My Orders
        </Link>

        <Link
          to="/collection"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
