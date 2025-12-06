"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/store/auth-context";
import {
  Settings,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Tag,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Product", href: "/dashboard/products" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: DollarSign, label: "Income", href: "#" },
  { icon: Tag, label: "Promote", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:relative z-50 h-screen
        transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        transition-transform duration-200 ease-in-out
        w-[306px] bg-white shadow-[0px_10px_60px_rgba(226,236,249,0.5)]
        flex flex-col
      `}
      >
        <div className="pt-9 pb-8 px-[28px]">
          <div className="flex items-center gap-[14px]">
            <div className="w-[37px] h-[37px] flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-[26px] font-semibold leading-[39px] tracking-[0.01em] text-black">
                Dashboard
              </h1>
              <span className="text-[10px] font-normal leading-[15px] tracking-[-0.01em] text-[#838383]">
                v.01
              </span>
            </div>
          </div>
        </div>

        <nav className="px-[28px] flex-1">
          <ul className="space-y-[2px]">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center justify-between
                      w-full h-[46px] px-[11px] rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#5932EA] text-white"
                          : "text-[#9197B3] hover:bg-[#5932EA]/5"
                      }
                    `}
                  >
                    <div className="flex items-center gap-[14px]">
                      <Icon
                        className="w-6 h-6"
                        color={isActive ? "#FFFFFF" : "#9197B3"}
                      />
                      <span
                        className={`
                        text-sm font-normal leading-[21px] tracking-[-0.01em]
                        ${isActive ? "font-medium" : "font-normal"}
                      `}
                      >
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight
                      className="w-4 h-4"
                      color={isActive ? "#FFFFFF" : "#9197B3"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-12 px-[28px] pb-8 space-y-8">
          <div className="relative p-4 rounded-[20px] bg-gradient-to-b from-[#EAABF0] to-[#4623E9]">
            <div className="absolute top-4 left-4 right-4">
              <div className="w-12 h-12 bg-white/20 rounded-full blur-md" />
            </div>
            <div className="relative z-10 text-center">
              <div className="mb-3">
                <h3 className="text-sm font-semibold leading-[21px] tracking-[0.01em] text-white">
                  Upgrade to PRO to get access all Features!
                </h3>
              </div>
              <button
                className="
                w-full h-10 bg-white rounded-[20px]
                shadow-[2px_4px_4px_rgba(79,42,234,0.17)]
                text-sm font-semibold leading-[21px] tracking-[0.01em] text-[#4925E9]
                hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2
              "
              >
                <CreditCard className="w-4 h-4" />
                Get Pro Now!
              </button>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-between w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full overflow-hidden">
                  <Image
                    src="/images/evano.png"
                    alt="Evano"
                    width={42}
                    height={42}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium leading-[21px] tracking-[0.01em] text-black text-left">
                    {user?.name || "Evano"}
                  </h4>
                  <p className="text-xs font-normal leading-[18px] tracking-[0.01em] text-[#757575]">
                    Project Manager
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#757575] transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "Evano"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "evano@example.com"}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
