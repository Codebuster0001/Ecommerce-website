// src/features/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/localStorage";

const persistedOrders = loadState("orders") || [];
const persistedCheckoutInfo = loadState("checkoutInfo") || null;

const initialState = {
  orders: persistedOrders,
  checkoutInfo: persistedCheckoutInfo,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      const newOrder = {
        ...action.payload,
        // Ensure paymentStatus is set — fallback to 'Processing' if missing
        paymentStatus: action.payload.paymentStatus || (action.payload.isPaid === true || action.payload.isPaid === "Paid" ? "Paid" : "Processing"),
      };
      
      state.orders.push(newOrder);
      saveState("orders", state.orders);

      state.checkoutInfo = newOrder;
      saveState("checkoutInfo", newOrder);
    },

    clearCheckoutData: (state) => {
      state.checkoutInfo = null;
      localStorage.removeItem("checkoutInfo");
    },

    loadCheckoutFromStorage: (state) => {
      const savedInfo = loadState("checkoutInfo");
      if (savedInfo) {
        state.checkoutInfo = savedInfo;
      }
    },

    loadOrdersFromStorage: (state) => {
      const savedOrders = loadState("orders");
      if (savedOrders) {
        state.orders = savedOrders;
      }
    },

    cleanOldDeliveredOrders: (state) => {
      const now = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);

      state.orders = state.orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const isPaid = order.paymentStatus?.toLowerCase() === "paid";
        return !(isPaid && orderDate < threeMonthsAgo);
      });

      saveState("orders", state.orders);
    },
  },
});

export const {
  setCheckoutData,
  clearCheckoutData,
  loadCheckoutFromStorage,
  loadOrdersFromStorage,
  cleanOldDeliveredOrders,
} = checkoutSlice.actions;

export const selectOrders = (state) => state.checkout.orders;
export const selectCheckoutInfo = (state) => state.checkout.checkoutInfo;

export default checkoutSlice.reducer;
