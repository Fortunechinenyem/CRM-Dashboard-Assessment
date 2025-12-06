import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
  avatars?: string[];
}

export function StatsCard({
  title,
  value,
  icon,
  change,
  color = "from-[#D3FFE7] to-[#EFFFF6]",
  avatars = [],
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-6">
      <div className="flex items-center justify-between">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          {icon}
        </div>

        <div className="text-right">
          <h3 className="text-sm font-normal text-[#ACACAC]">{title}</h3>
          <p className="text-2xl font-semibold text-[#333333] mt-1">{value}</p>

          {change && (
            <div
              className={`flex items-center gap-1 mt-2 ${
                change.isPositive ? "text-[#00AC4F]" : "text-[#D0004B]"
              }`}
            >
              <span
                className={`transform ${
                  !change.isPositive ? "rotate-180" : ""
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 15V5M10 5L5 10M10 5L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-xs font-bold">{change.value}</span>
            </div>
          )}

          {avatars.length > 0 && (
            <div className="flex -space-x-2 mt-3">
              {avatars.map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs"
                >
                  {avatar}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
