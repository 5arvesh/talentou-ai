// src/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// Define AuthContext interface
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default undefined (we'll handle this in useAuth)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Token expiration check
function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // treat invalid tokens as expired
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const checkTokenExpiration = () => {
        if (isTokenExpired(token)) {
          // Optionally show toast here
          setToken(null);
          localStorage.removeItem("token");
        }
      };

      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, 60000); // every 60 seconds
      return () => clearInterval(interval);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
      isAuthenticated,
    }),
    [token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook with error handling
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
