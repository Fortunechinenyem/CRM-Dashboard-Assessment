"use client";

import { Users, UserCheck, Monitor, Search } from "@/components/ui/Icons";

const stats = [
  {
    icon: Users,
    title: "Total Customers",
    value: "5,423",
    change: "+16%",
    isPositive: true,
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
  },
  {
    icon: UserCheck,
    title: "Members",
    value: "1,893",
    change: "-1%",
    isPositive: false,
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
  },
  {
    icon: Monitor,
    title: "Active Now",
    value: "189",
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
    avatars: ["😀", "😊", "😎", "🤓", "😍"],
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-semibold leading-[33px] tracking-[-0.01em] text-black">
            Recent Activity
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="
                w-[216px] h-[38px] pl-11 pr-4
                bg-white rounded-xl
                shadow-[0px_10px_60px_rgba(226,236,249,0.5)]
                text-sm font-normal leading-[21px] tracking-[-0.01em]
                text-[#B5B7C0] placeholder:text-[#B5B7C0]
                focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
              "
            />
          </div>
        </div>

        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-4xl">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recent activity
          </h3>
          <p className="text-gray-600">
            Activity will appear here as it happens
          </p>
        </div>
      </div>
    </div>
  );
}
