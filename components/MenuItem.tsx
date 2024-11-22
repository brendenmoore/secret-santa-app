import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
  isFirst?: boolean;
  isLast?: boolean;
}

export function MenuItem({ 
  children, 
  className, 
  variant = "default",
  isFirst = true,
  isLast = true,
  ...props 
}: MenuItemProps) {
  return (
    <button
      className={twMerge(
        "w-full px-4 py-2 text-left text-sm transition-colors",
        "flex items-center gap-2 font-mono",
        variant === "default" && "text-gray-700 hover:bg-gray-50",
        variant === "danger" && "text-red-600 hover:bg-red-50",
        isFirst && "rounded-t-lg",
        isLast && "rounded-b-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
