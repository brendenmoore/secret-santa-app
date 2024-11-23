import { Dialog as HeadlessDialog, DialogPanel } from "@headlessui/react";
import CloseIcon from "./icons/CloseIcon";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-max max-w-lg bg-white rounded-lg shadow-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
              aria-label="Close dialog"
            >
              <CloseIcon />
            </button>
            <div className="p-6 font-mono">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  );
}
