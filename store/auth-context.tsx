"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  email: string;
  name: string;
  role?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
  {
    email: "user@example.com",
    password: "password123",
    name: "Demo User",
    role: "user",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("crm_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);

          const lastLogin = new Date(userData.lastLogin);
          const now = new Date();
          const hoursDiff =
            (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

          if (hoursDiff < 24) {
            setUser(userData);
          } else {
            localStorage.removeItem("crm_user");
          }
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("crm_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = pathname === "/login";
    const isProtectedPage = pathname.startsWith("/dashboard");

    if (!user && isProtectedPage) {
      router.push("/login");
    } else if (user && isAuthPage) {
      router.push("/dashboard");
    }
  }, [user, isLoading, pathname, router]);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const userData: User = {
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      lastLogin: new Date().toISOString(),
    };

    localStorage.setItem("crm_user", JSON.stringify(userData));
    setUser(userData);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("crm_user");
    setUser(null);
    router.push("/login");
  }, [router]);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = { ...prev, ...userData };
      localStorage.setItem("crm_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
