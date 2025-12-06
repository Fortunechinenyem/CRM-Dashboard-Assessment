import * as Iconsax from "lucide-react";
import * as Lucide from "lucide-react";
import { ComponentType } from "react";

const iconMap: Record<string, ComponentType<any>> = {};

interface IconWrapperProps {
  name: string;
  variant?: "Outline" | "Bold" | "Bulk" | "Linear";
  size?: number;
  color?: string;
  className?: string;
  fallback?: ComponentType<any>;
}

export function IconWrapper({
  name,
  variant = "Outline",
  size = 24,
  color,
  className,
  fallback: FallbackIcon,
}: IconWrapperProps) {
  const iconsaxName = `${name}${variant}`;

  try {
    // Try Iconsax first
    if (Iconsax[iconsaxName as keyof typeof Iconsax]) {
      const Icon = Iconsax[
        iconsaxName as keyof typeof Iconsax
      ] as ComponentType<any>;
      return <Icon size={size} color={color} className={className} />;
    }

    if (Lucide[name as keyof typeof Lucide]) {
      const Icon = Lucide[name as keyof typeof Lucide] as ComponentType<any>;
      return <Icon size={size} color={color} className={className} />;
    }

    if (FallbackIcon) {
      return <FallbackIcon size={size} color={color} className={className} />;
    }

    return (
      <Lucide.HelpCircle size={size} color={color} className={className} />
    );
  } catch (error) {
    return (
      <Lucide.AlertCircle size={size} color={color} className={className} />
    );
  }
}
