import React from "react";

const RazorpayButton = ({ amount, userDetails, onSuccess, onError }) => {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleRazorpay = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to create Razorpay order");

      const orderData = await res.json();

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shopy",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${backendUrl}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: orderData.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              onSuccess(response);
            } else {
              onError &&
                onError({ description: "Payment verification failed." });
            }
          } catch (error) {
            onError && onError({ description: "Verification request failed." });
          }
        },
        prefill: {
          name: `${userDetails.firstName} ${userDetails.lastName}`,
          email: "test@example.com", // Optional: add dynamic email
          contact: userDetails.phone,
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", ({ error }) => onError && onError(error));
    } catch (err) {
      onError && onError({ description: "Error initiating payment" });
    }
  };

  if (!razorpayKey) {
    console.error("Razorpay key is not set");
    return null;
  }

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
