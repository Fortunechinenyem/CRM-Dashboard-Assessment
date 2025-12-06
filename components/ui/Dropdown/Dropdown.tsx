"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full h-[38px] px-4
          bg-[#F9FBFF] rounded-lg
          flex items-center justify-between
          text-sm font-normal text-gray-700
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
          transition-all duration-200
        "
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon && selectedOption.icon}
          <span className={selectedOption ? "text-gray-700" : "text-gray-400"}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="
          absolute top-full mt-1 w-full
          bg-white rounded-lg shadow-lg border border-gray-200
          py-1 z-50 max-h-60 overflow-auto
        "
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full px-4 py-2 text-left text-sm
                flex items-center gap-2
                transition-colors duration-150
                ${
                  value === option.value
                    ? "bg-[#5932EA]/10 text-[#5932EA]"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {option.icon && option.icon}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
