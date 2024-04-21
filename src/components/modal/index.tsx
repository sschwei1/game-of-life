import React, {useRef} from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  innerClasses?: string[];
}

const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  innerClasses
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
        {title && <h1>{title}</h1>}
        <div className={'inner ' + innerClasses?.join(' ')}>
          {children}
        </div>
      </div>
    </div
>
  );
}

export default Modal;