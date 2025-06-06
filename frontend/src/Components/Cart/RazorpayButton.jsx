import React from "react";

const RazorpayButton = ({ amount, userDetails, onSuccess, onError }) => {
  const handleRazorpay = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ Correct usage
      amount: amount * 100,
      currency: "INR",
      name: "Shopy",
      description: "Order Payment",
      image: "https://yourstore.com/logo.png",
      handler: function (response) {
        onSuccess && onSuccess(response);
      },
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: "test@example.com",
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
