import React from "react";
import logo from "../../../public/logo-shopyes.png"; // Adjust the path as necessary
const RazorpayButton = ({ amount, userDetails, onSuccess, onError }) => {
  const handleRazorpay = () => {
    // Ensure Razorpay SDK is loaded
    if (!window.Razorpay) {
      onError && onError({ description: "Razorpay SDK not loaded." });
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ Public Key from .env
      amount: amount * 100, // amount in paise
      currency: "INR",
      name: "Shopy",
      description: "Order Payment",
      image: { logo }, // optional
      handler: function (response) {
        // Trigger onSuccess callback from parent
        onSuccess && onSuccess(response);
      },
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: "test@example.com", // optional - replace with actual if available
        contact: userDetails.phone,
      },
      notes: {
        address: userDetails.address,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();

    rzp.on("payment.failed", function (response) {
      onError && onError(response.error);
    });
  };

  return (
    <button
      type="button"
      onClick={handleRazorpay}
      className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
