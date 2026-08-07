import React from 'react';

function LoadingSpinner() {
  return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block',
        width: '48px',
        height: '48px',
        border: '3px solid var(--border)',
        borderTop: '3px solid var(--gold)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;