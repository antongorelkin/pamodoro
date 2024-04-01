import { useEffect, useRef, useState } from "react";
import styles from './modal.module.css';
import Cancel from '/src/assets/close.svg';
import ReactDOM from "react-dom";


interface IModalProps {
  children?: React.ReactNode;
  onModalClose?: () => void
};

const NOOP = () => { };

export function Modal({ children, onModalClose = NOOP }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !modalRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  const node = document.getElementById('modal');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.btnCancel} onClick={onModalClose}>
          <Cancel />
        </button>
        {children}
      </div >
    </div >
  ), node);
}

