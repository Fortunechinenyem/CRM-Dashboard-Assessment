interface StatusBadgeProps {
  status: "Active" | "Inactive";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === "Active";

  return (
    <div
      className={`
      inline-flex items-center justify-center px-3 py-[4px] rounded
      ${
        isActive
          ? "bg-[rgba(22,192,152,0.38)] border border-[#00B087]"
          : "bg-[#FFC5C5] border border-[#DF0404]"
      }
    `}
    >
      <span
        className={`
        text-sm font-medium leading-[21px] tracking-[-0.01em]
        ${isActive ? "text-[#008767]" : "text-[#DF0404]"}
      `}
      >
        {status}
      </span>
    </div>
  );
}
