import React, { useState, useEffect } from 'react';

let modalCallbacks = [];

export function showModal(title, message, onConfirm) {
  modalCallbacks.forEach(cb => cb(title, message, onConfirm));
}

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);

  useEffect(() => {
    const handler = (title, message, onConfirm) => {
      setTitle(title);
      setMessage(message);
      setOnConfirm(() => onConfirm);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };
    modalCallbacks.push(handler);
    return () => {
      modalCallbacks = modalCallbacks.filter(cb => cb !== handler);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleConfirm = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}>
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-outline btn-sm" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;