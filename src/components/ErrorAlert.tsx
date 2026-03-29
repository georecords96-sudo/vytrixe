"use client";

import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onClear: () => void;
}

export function ErrorAlert({ message, onClear }: ErrorAlertProps) {
  return (
    <div className="container mx-auto px-4 mt-8 max-w-2xl">
      <div className="flex items-center gap-4 rounded-2xl bg-red-50 p-4 border border-red-100">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-red-900">Unable to process video. Try another link.</h4>
          <p className="text-xs text-red-700 mt-0.5">{message}</p>
        </div>
        <button 
          onClick={onClear}
          className="p-2 text-red-400 hover:text-red-900 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
