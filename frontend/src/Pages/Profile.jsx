import React from "react";
import { useNavigate } from "react-router-dom";
import MyOrders from "./MyOrders";
import { useAuth } from "../Components/Common/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
                {user.email.charAt(0).toUpperCase()}
                {user.email.charAt(1).toUpperCase()}
              </div>
              <h1 className="text-xl font-semibold">{user.email}</h1>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
            >
              Log Out
            </button>
          </div>

          {/* Orders */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
