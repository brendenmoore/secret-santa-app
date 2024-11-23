import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "group relative text-white uppercase font-bold text-3xl outline-offset-4",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
        <span className="absolute top-0 left-0 w-full h-full rounded-lg blur-[2px] bg-slate-700 bg-opacity-50 transform translate-y-[2px] group-active:translate-y-[1px] group-hover:translate-y-[4px] group-hover:duration-200 transition-transform duration-700"/>
        <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-r from-red-800  via-red-600  to-red-800" />
      <span className="block relative py-4 px-10 rounded-lg transform bg-red-500 translate-y-[-4px] group-active:translate-y-[-2px] group-active:duration-75 group-hover:translate-y-[-6px] group-hover:duration-200 transition-transform duration-700">
        {children}
      </span>
    </button>
  );
};

export default Button;
