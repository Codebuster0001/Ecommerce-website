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
import NewArrivals from './Components/Products/NewArrivals';
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import MyOrders from "./Pages/MyOrders";
import CartContent from './Components/Cart/CartContent';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Routes>
  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="profile" element={<Profile />} />

    {/* Route for "/collection" with optional query params */}
    <Route path="collection" element={<CollectionPage />} />
    
    {/* Route for "/collection/:collection" if you want to match with param */}
    <Route path="collection/:collection" element={<CollectionPage />} />

    {/* Route for "/collections/:type" */}
    <Route path="collections/:type" element={<CollectionPage />} />
   <Route path="/cart" element={<CartContent />} />
    <Route path="products/:id" element={<ProductDetails />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="order-confirmation" element={<OrderConfirmationPage />} />
    <Route path="my-orders" element={<MyOrders />} />
  </Route>
</Routes>
    </>
  );
}

export default App;
