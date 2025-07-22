import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, AuthState, LoginCredentials, User } from "../types";

// Create dummy user
const dummyUser: User = {
  id: 1,
  username: "user",
};

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Get state from localStorage
const getStoredAuth = (): AuthState => {
  try {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : initialState;
  } catch {
    return initialState;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>(getStoredAuth);
  const navigate = useNavigate();

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    
    if (
      credentials.username === "user" &&
      credentials.password === "password"
    ) {
      const token = "dummy-token-" + Math.random().toString(36).substring(2);

      setAuth({
        isAuthenticated: true,
        user: dummyUser,
        token,
      });

      navigate("/");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // Logout function
  const logout = () => {
    setAuth(initialState);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
