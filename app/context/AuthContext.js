"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check storage for token on mount
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      // In a real app, you might validate the token with the backend here
      // For now, we'll decode/use stored info or just assume validity if needed
      // To keep it simple based on your existing code structure:
      const savedUser = {
        username:
          localStorage.getItem("username") ||
          sessionStorage.getItem("username"),
        status:
          localStorage.getItem("status") || sessionStorage.getItem("status"),
        // You might store more info or fetch it from /me endpoint
      };
      if (savedUser.username) {
        setUser(savedUser);
      }
    }
  }, []);

  const login = (userData, remember = false) => {
    // If userData comes from API, it might have 'token' and 'status'
    // Ensure we save it to localStorage so persistence works
    if (userData.token) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("status", userData.status || "user");
      localStorage.setItem("username", userData.username);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    router.push("/login");
  };

  const isAdmin = user?.status === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
