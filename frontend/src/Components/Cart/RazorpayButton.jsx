import React from "react";

const RazorpayButton = ({ amount, userDetails, onSuccess, onError }) => {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleRazorpay = async () => {
    if (!window.Razorpay || !razorpayKey) {
      console.error("❌ Razorpay SDK or key is missing.");
      onError?.({ description: "Razorpay not configured properly." });
      return;
    }

    try {
      // 1. Create order
      const res = await fetch(`${backendUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to create Razorpay order");

      const orderData = await res.json();

      // 2. Setup payment options
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shopy",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async (response) => {
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
            verifyData.success ? onSuccess(response) : onError?.({ description: "Payment verification failed." });
          } catch (error) {
            console.error("Verification error:", error);
            onError?.({ description: "Verification request failed." });
          }
        },
        prefill: {
          name: `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`,
          email: userDetails?.email || "test@example.com",
          contact: userDetails?.phone || "9999999999",
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (err) => {
        console.error("Payment failed:", err);
        onError?.(err.error);
      });
    } catch (err) {
      console.error("Payment initiation error:", err);
      onError?.({ description: err.message || "Payment initiation failed" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleRazorpay}
      className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      disabled={!razorpayKey}
    >
      {razorpayKey ? "Pay with Razorpay" : "Razorpay Not Configured"}
    </button>
  );
};

export default RazorpayButton;
