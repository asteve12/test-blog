import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function ModalElement({ children, onclose }) {
  const modalRoot = document.getElementById('modal');

  modalRoot.onclick = function () {
    onclose();
  };

  const elRef = useRef(null);
  if (!elRef.current) {
    const elem = document.createElement('div');
    elRef.current = elem;
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  });

  return createPortal(
    <div onClick={(e) => e.stopPropagation()} className="modal-content">
      {children}
    </div>,
    elRef.current
  );
}

export default ModalElement;
