import React from 'react';
import { useFeed } from '../../context/FeedContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useFeed();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-zinc-900/90 dark:bg-zinc-800/95 text-white backdrop-blur-md rounded-full shadow-2xl border border-zinc-700/50 text-sm font-medium">
        {icons[toast.type] || icons.info}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

