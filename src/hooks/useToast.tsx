import React, { useState, useCallback } from 'react';
import { Toast } from '../components/common/Toast';

interface ToastMessage {
  id: number;
  message: string;
  variant: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, variant: ToastMessage['variant'] = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const ToastContainer = useCallback(() => {
    if (toasts.length === 0) return null;

    return (
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    );
  }, [toasts, removeToast]);

  return {
    addToast,
    removeToast,
    ToastContainer
  };
}