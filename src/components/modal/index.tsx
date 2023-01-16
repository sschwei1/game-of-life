import React, {useRef} from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = ({
  isOpen = false,
  onClose,
  children
}: ModalProps) => {
  const modalRef = useRef(null);

  const handleClose: React.MouseEventHandler<HTMLDivElement> = (evt) => {
    if(modalRef.current === evt.target) {
      onClose && onClose();
    }
  }

  if(!isOpen) return <></>;

  return (
    <div
      ref={modalRef}
      className='modal'
      onClick={handleClose}
    >
      <div className='content'>
        {children}
      </div>
    </div
>
  );
}

export default Modal;