import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';
import './AuthModal.css';

export default function AuthModal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal-reg" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}