"use client";

import { createContext, useContext, useState } from "react";
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
        role: localStorage.getItem("role") || sessionStorage.getItem("role"),
        // You might store more info or fetch it from /me endpoint
      };
      if (savedUser.username) {
        setUser(savedUser);
      }
    }
  }, []);

  const login = (userData, remember = false) => {
    setUser(userData);
    // Storage logic is handled in the Page component for this app structure,
    // or we can move it here. Ideally context handles everything.
    // For now, let's keep the context updating the state so Navbar reacts.
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    router.push("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
