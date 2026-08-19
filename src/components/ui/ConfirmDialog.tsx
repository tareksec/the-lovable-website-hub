import { useCallback, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmState {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback(
    (options: {
      title?: string;
      message?: string;
      confirmLabel?: string;
      onConfirm: () => void;
    }) => {
      setState({
        title: options.title ?? "Delete this item?",
        message: options.message ?? "This action cannot be undone.",
        confirmLabel: options.confirmLabel ?? "Delete",
        onConfirm: options.onConfirm,
      });
    },
    [],
  );

  const dialog = state ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={() => setState(null)}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#14202d]">{state.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{state.message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setState(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              state.onConfirm();
              setState(null);
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {state.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, dialog };
}
