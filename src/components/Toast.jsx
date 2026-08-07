import React, { useState, useEffect } from 'react';

let toastCallbacks = [];

export function showToast(message, type = 'info') {
  toastCallbacks.forEach(cb => cb(message, type));
}

function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (message, type) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3800);
    };
    toastCallbacks.push(handler);
    return () => {
      toastCallbacks = toastCallbacks.filter(cb => cb !== handler);
    };
  }, []);

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span>{icons[toast.type] || 'ℹ️'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export default Toast;