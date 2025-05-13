import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      
      <Routes >
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
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
