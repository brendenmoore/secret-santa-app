import { twMerge } from "tailwind-merge";

interface SmallButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const SmallButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}: SmallButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "py-2 px-6 text-white uppercase font-bold text-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors duration-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default SmallButton;
