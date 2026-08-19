import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function DeleteButton({
  onConfirm,
  label,
  itemName,
  size = 18,
}: {
  onConfirm: () => void;
  label: string;
  itemName?: string;
  size?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-gray-400 transition hover:text-red-600"
        aria-label={label}
      >
        <Trash2 size={size} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#14202d]">{label}?</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {itemName ? (
                    <span className="font-medium text-gray-700">{itemName}</span>
                  ) : (
                    "This item"
                  )}{" "}
                  will be permanently removed. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:scale-95 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
