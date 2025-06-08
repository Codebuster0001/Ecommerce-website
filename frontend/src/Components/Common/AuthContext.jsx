import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that wraps your app
export const AuthProvider = ({ children }) => {
  // Load user from localStorage initially
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Determine login status
  const isLoggedIn = !!user;

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Register function (mock logic)
  const register = async (name, email, password) => {
    try {
      // Mock validation
      if (name && email && password) {
        const newUser = { name, email };
        setUser(newUser); // Automatically login after registration
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // Login function (mock logic)
  const login = async (email, password) => {
    try {
      // Hardcoded login credentials for test
      if (email === "test@gmail.com" && password === "test@1231") {
        const userData = { name: "Test User", email };
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Context value
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
