import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      {/**User Layout */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home/>} />
      </Route>
      {/**Admin Layout */}
      <Route path="/"></Route>
      
    </Routes>
  );
}

export default App;
