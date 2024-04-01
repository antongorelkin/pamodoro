import { useState } from 'react';
import styles from './menu.module.css';
import { Dropdown } from '../Dropdown/Dropdown';
import MenuIcon from '/src/assets/menu.svg';
import Add from '/src/assets/plus.svg';
import Reduce from '/src/assets/minus.svg';
import Edit from '/src/assets/edit.svg';
import Delete from '/src/assets/delete.svg';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { ITodo, decrementTask, editTask, incrementTask, removeTask } from '../../../../../store/slice/todosSlice';
import { Modal } from '../../Modal/Modal';

interface IMenuProps {
  task: ITodo,
  onClose?: () => void
}


export function Menu({ task }: IMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();



  const addTimeTask = () => {
    dispatch(incrementTask(task.id))
  }

  const removeTimeTask = () => {
    dispatch(decrementTask(task.id))
  }

  const editInputTask = () => {
    dispatch(editTask(task.id))
  }

  const deleteTodoTask = () => {
    dispatch(removeTask(task.id))
  }
  return (
    <div className={styles.menu}>
      <Dropdown onClose={() => setIsOpen(true)}
        button={
          <button className={styles.menuButton}>
            <MenuIcon />
          </button>
        }>
        <div className={styles.dropdown}>
          <div className={styles.dropdownList}>
            <button className={styles.menuTodoBtn} onClick={addTimeTask} >
              <Add /> Увеличить
            </button>
            <button className={styles.menuTodoBtn} disabled={task.count === 1} onClick={removeTimeTask} >
              <Reduce /> Уменьшить
            </button>
            <button className={styles.menuTodoBtn} onClick={editInputTask}>
              <Edit /> Редактировать
            </button>
            <button className={styles.menuTodoBtn} onClick={() => { setIsModalOpen(true) }}>
              <Delete /> Удалить
            </button>
          </div>
        </div>
      </Dropdown>
      {isModalOpen &&
        <Modal onModalClose={() => { setIsModalOpen(false) }}>
          <h3 className={styles.modalTitle}>
            Удалить задачу?
          </h3>
          <button className={styles.deleteBtn} onClick={deleteTodoTask}>
            Удалить
          </button>
          <button className={styles.btnEsc} onClick={() => { setIsModalOpen(false) }}>
            Отмена
          </button>
        </Modal>}
    </div>
  )
}