interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  search?: {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
  };
}

export function PageHeader({
  title,
  subtitle,
  action,
  search,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
        {subtitle && (
          <p className="text-sm font-normal text-[#16C098] mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {search && (
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="#7E7E7E"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L17 17"
                  stroke="#7E7E7E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              className="
                w-full sm:w-[216px] h-[38px] pl-11 pr-4
                bg-white rounded-xl shadow-[0px_10px_60px_rgba(226,236,249,0.5)]
                text-sm font-normal text-gray-700 placeholder:text-[#B5B7C0]
                focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
              "
            />
          </div>
        )}

        {action && action}
      </div>
    </div>
  );
}
