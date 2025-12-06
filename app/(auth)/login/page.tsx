"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-400 rounded-2xl mb-8 shadow-xl">
              <div className="text-white text-xl font-bold">CRM</div>
            </div>
            <h1 className="mt-12 text-xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-xl">Sign in to your account</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-base font-medium text-center">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  placeholder="you@company.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-medium text-gray-900">
                  Password
                </label>
                <a
                  href="#"
                  className="text-base text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-14 py-4 text-lg border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={isLoading}
              />
              <label
                htmlFor="remember"
                className="ml-4 text-base text-gray-700"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-6 bg-blue-400 hover:to-indigo-800 text-white text-xl font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <div className="mt-15 pt-10 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-6 font-medium">
                Demo Account Credentials
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 mb-2 font-medium">
                    Email
                  </p>
                  <p className="font-mono text-gray-900 text-xl font-semibold">
                    admin@example.com
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 mb-2 font-medium">
                    Password
                  </p>
                  <p className="font-mono text-gray-900 text-xl font-semibold">
                    password123
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-base mt-6">
                Use these credentials to test the application
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
