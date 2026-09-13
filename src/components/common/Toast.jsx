import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  AlertOctagon, 
  X 
} from 'lucide-react';

export const ToastItem = ({ toast, onDismiss }) => {
  const { id, title, message, type } = toast;

  let icon = <Info className="w-5 h-5 text-sky-500 flex-shrink-0" />;
  let borderClass = "border-sky-500/30 bg-white/95 dark:bg-forest-950/95 shadow-lg shadow-sky-950/5";
  let titleColor = "text-sky-900 dark:text-sky-200";

  if (type === 'success') {
    icon = <CheckCircle2 className="w-5 h-5 text-nature-500 flex-shrink-0" />;
    borderClass = "border-nature-500/30 bg-white/95 dark:bg-forest-950/95 shadow-lg shadow-nature-950/5";
    titleColor = "text-forest-900 dark:text-nature-200";
  } else if (type === 'warning') {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
    borderClass = "border-amber-500/30 bg-white/95 dark:bg-forest-950/95 shadow-lg shadow-amber-950/5";
    titleColor = "text-amber-900 dark:text-amber-200";
  } else if (type === 'critical') {
    icon = <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 animate-pulse" />;
    borderClass = "border-red-500/40 bg-white/95 dark:bg-forest-950/95 shadow-lg shadow-red-950/10";
    titleColor = "text-red-900 dark:text-red-200";
  }

  return (
    <div 
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm sm:max-w-md w-full ${borderClass}`}
    >
      <div className="pt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0 pr-1">
        {title && (
          <h4 className={`text-xs font-bold font-heading ${titleColor}`}>
            {title}
          </h4>
        )}
        <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5 leading-relaxed break-words">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="min-w-[44px] min-h-[44px] -mr-2 -mt-2 flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-forest-500/30"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <aside 
      aria-label="Live Notifications"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-[calc(100vw-32px)] sm:max-w-md w-full pointer-events-auto"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </aside>
  );
};

export default ToastContainer;
