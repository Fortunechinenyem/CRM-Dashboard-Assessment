import { ButtonHTMLAttributes, forwardRef } from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#5932EA] text-white hover:bg-[#4925E9] focus:ring-[#5932EA]/20",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${widthClass}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner
            size={size === "lg" ? "md" : "sm"}
            color="currentColor"
          />
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
