import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage initially
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, password) => {
    if (email === "test@gmail.com" && password === "test@1231") {
      const userData = { email };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
