import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/Products/ProductDetails";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import MyOrders from "./Pages/MyOrders";
import CartContent from "./Components/Cart/CartContent";
import PrivateRoute from "./Components/Common/PrivateRoute";
import { AuthProvider } from "./Components/Common/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="checkout"
            element={
              
                <Checkout />
           
            }
          />

          {/* Public routes */}
          <Route path="collection" element={<CollectionPage />} />
          <Route path="collection/:collection" element={<CollectionPage />} />
          <Route path="collections/:type" element={<CollectionPage />} />
          <Route path="/cart" element={<CartContent />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="order-confirmation" element={
            <OrderConfirmationPage />
            } />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
