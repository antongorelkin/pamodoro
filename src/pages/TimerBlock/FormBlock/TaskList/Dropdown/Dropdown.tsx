import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom";
import styles from './dropdowm.module.css';


interface IDropdownProps {
  button: React.ReactNode,
  children: React.ReactNode,
  isOpen?: boolean,
  onOpen?: () => void,
  onClose?: () => void
}

const NOOP = () => { }

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

  const handleOpen = (): any => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <div onClick={handleOpen} >
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

