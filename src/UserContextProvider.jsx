import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // You'll need to install js-cookie for cookie handling

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from JWT cookie on initial render
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // Optionally, decode the JWT token to get user data
      // You can decode JWT using a library like jwt-decode if needed
      setUser({ token }); // Set user with token, or decoded user info
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Save JWT token to cookies
    Cookies.set('token', userData.token, { expires: 7 }); // Expire in 7 days
  };

  const logout = () => {
    setUser(null);
    // Remove the JWT token cookie
    Cookies.remove('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
