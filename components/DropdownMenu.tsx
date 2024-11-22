import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import MenuIcon from "./icons/MenuIcon";

interface DropdownMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  trigger?: React.ReactNode;
}

export function DropdownMenu({
  children,
  isOpen,
  onOpenChange,
  trigger,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenChange]);

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        onClick={() => onOpenChange(!isOpen)}
        className="p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Menu"
      >
        {trigger || <MenuIcon />}
      </button>
      {isOpen &&
        buttonRef.current &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed py-0 w-36 bg-white rounded-lg shadow-lg text-gray-700 z-50 overflow-hidden"
            style={{
              top: buttonRef.current.getBoundingClientRect().bottom + 4,
              left: buttonRef.current.getBoundingClientRect().right - 144,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}
