import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";

function App() {
  return (
    <Routes>
      {/**User Layout */}
      <Route path="/" element={<UserLayout />}></Route>
      {/**Admin Layout */}
      <Route path="/"></Route>
      
    </Routes>
  );
}

export default App;
