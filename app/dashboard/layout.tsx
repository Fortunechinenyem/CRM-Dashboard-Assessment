"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/store/auth-context";
import { Menu, X, Search } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed inset-y-0 left-0 z-50
          transition-transform duration-300 ease-in-out
        `}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          transition-all duration-300
          lg:ml-[306px]
        `}
      >
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-medium text-gray-900">
                  Hello {user?.name || "Evano"} 👋🏼,
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    className="w-[216px] h-[38px] pl-11 pr-4 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20"
                    placeholder="Search..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleMenuToggle}
                  className="lg:hidden p-2 text-gray-400 hover:text-gray-500"
                >
                  {sidebarOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
