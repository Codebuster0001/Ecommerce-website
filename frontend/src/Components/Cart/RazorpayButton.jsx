import React from "react";

const RazorpayButton = ({ amount, userDetails, onSuccess, onError }) => {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleRazorpay = async () => {
    if (!razorpayKey) {
      console.error("❌ Razorpay key is missing.");
      onError?.({ description: "Razorpay key is not configured." });
      return;
    }

    try {
      // 1. Create order from backend
      const res = await fetch(`${backendUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to create Razorpay order");

      const orderData = await res.json();

      // 2. Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shopy",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
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
              onError?.({ description: "Payment verification failed." });
            }
          } catch (error) {
            console.error("Verification error:", error);
            onError?.({ description: "Verification request failed." });
          }
        },
        prefill: {
          name: `${userDetails.firstName} ${userDetails.lastName}`,
          email: "test@example.com",
          contact: userDetails.phone,
        },
        theme: { color: "#000000" },
      };

      // 4. Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (errorResponse) => {
        console.error("Payment failed:", errorResponse);
        onError?.(errorResponse.error);
      });
    } catch (err) {
      console.error("Payment initiation error:", err);
      onError?.({ description: "Error initiating payment" });
    }
  };

  if (!razorpayKey) {
    return (
      <button
        disabled
        className="w-full bg-gray-400 text-white py-3 rounded-md cursor-not-allowed"
      >
        Razorpay Key Not Configured
      </button>
    );
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
