import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import MyOrders from "./Pages/MyOrders";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      
      <Routes >
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myorders" element={<MyOrders />} />
          {/* Add more routes as needed */}
        </Route>

        {/* Admin Layout - placeholder for future */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
