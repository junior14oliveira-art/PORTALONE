'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

/* ─── Context ─────────────────────────────────────────────────────────────── */
const ToastContext = createContext(null);

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}

function XIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

/* ─── Single Toast Item ───────────────────────────────────────────────────── */
function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  // Slide in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Auto dismiss
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 350);
    }, 3000);
    return () => clearTimeout(t);
  }, [toast.id, onRemove]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 350);
  };

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(110%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
      }}
      className={`
        flex items-start gap-3 w-full max-w-sm bg-white rounded-xl shadow-xl
        border border-border overflow-hidden
        ${isSuccess ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-red-500'}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon badge */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-3 ml-3
        ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
        {isSuccess ? <CheckIcon /> : <XIcon />}
      </div>

      {/* Message */}
      <div className="flex-1 py-3 pr-2 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug break-words">{toast.message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-muted hover:text-foreground transition-colors p-2 mt-1 mr-1 rounded-lg hover:bg-muted-bg"
        aria-label="Fechar notificação"
      >
        <XIcon size={14} />
      </button>
    </div>
  );
}

/* ─── Provider ────────────────────────────────────────────────────────────── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const MAX_TOASTS = 3;

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => {
      const next = [...prev, { id, message, type }];
      return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next;
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container — top-right */}
      <div
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 items-end pointer-events-none"
        aria-label="Notificações"
      >
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto w-full max-w-sm">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Hook ────────────────────────────────────────────────────────────────── */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
