import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 App load hote hi localStorage se data uthao
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && isAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // 🔐 Login
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 Logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
