import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  debounceDelay?: number;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  value: externalValue,
  onChange,
  debounceDelay = 300,
  className = "",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue || "");

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (onChange) {
      const timer = setTimeout(() => {
        onChange(internalValue);
      }, debounceDelay);

      return () => clearTimeout(timer);
    }
  }, [internalValue, debounceDelay, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    if (onChange && externalValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full h-[38px] pl-11 pr-4
          bg-[#F9FBFF] rounded-lg
          text-sm text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
          transition-all duration-200
        "
      />
    </div>
  );
}
