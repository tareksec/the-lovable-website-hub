import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

export function SkeletonCards({ count = 3, lines = 3 }: { count?: number; lines?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3f4f6] to-transparent animate-shimmer -translate-x-full" />
          <div className="relative z-10">
            <div className="h-6 w-1/3 bg-gray-100 rounded-lg mb-6" />
            {Array.from({ length: lines }).map((__, j) => (
              <div 
                key={j} 
                className="h-4 bg-gray-50 rounded-md mb-3" 
                style={{ width: j % 2 === 0 ? '100%' : '80%' }} 
              />
            ))}
            <div className="h-10 w-full bg-gray-50 rounded-xl mt-6" />
          </div>
        </div>
      ))}
    </>
  );
}

export function ErrorState({
  title = 'We could not load this content',
  message = 'Something went wrong while contacting the server. Please try again.',
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="col-span-full mx-auto max-w-xl rounded-2xl border-2 border-dashed border-red-200 bg-red-50/30 px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertTriangle size={32} />
      </div>
      <h3 className="mb-3 text-xl font-extrabold text-[#14202d]">{title}</h3>
      <p className="mb-8 text-gray-600 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="bec-primary bec-btn-hover inline-flex items-center gap-2 px-8 py-3 font-bold"
        >
          <RefreshCw size={18} /> Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon, title, message }: { icon?: ReactNode; title: string; message?: string }) {
  return (
    <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/30 px-6 py-20 text-center">
      {icon ? (
        <div className="mx-auto mb-6 flex justify-center text-[#c09643] opacity-60">{icon}</div>
      ) : (
        <div className="mx-auto mb-6 h-12 w-12 border-4 border-gray-200 border-t-[#08735d] rounded-full animate-pulse" />
      )}
      <h3 className="mb-3 text-xl font-extrabold text-[#14202d]">{title}</h3>
      {message && <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">{message}</p>}
    </div>
  );
}
