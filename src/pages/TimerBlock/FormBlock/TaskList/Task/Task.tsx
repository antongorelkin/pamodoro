
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { ITodo, editTask, renameTask } from "../../../../../store/slice/todosSlice";
import styles from './task.module.css';
import { Menu } from "../Menu/Menu";
import React, { useContext, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { currentContext } from "../../../../../context/currentContext";


interface ITodoTask {
  todoTask: ITodo
};

export function Task({ todoTask }: ITodoTask) {
  const taskList = useAppSelector(state => state.todos.todos);
  const [taskTitle, setTaskTitle] = useState(todoTask.title);

  const { setCurrentTask } = useContext(currentContext);


  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value)
  }

  function handleSubmit(event: React.KeyboardEvent) {
    if (event.code === 'Enter') {
      dispatch(renameTask({ id: todoTask.id, title: taskTitle }))
    }
  }

  const handleCurrent = () => {
    setCurrentTask(taskList.indexOf(todoTask))
  }

  return (
    <li className={styles.task}>
      <span className={styles.taskCount}>
        {todoTask.count}
      </span>
      <div className={styles.taskBlock} onClick={handleCurrent}>
        {todoTask.edit ?
          <input className={styles.input}
            value={taskTitle}
            type='text'
            onChange={handleChange}
            onKeyPress={handleSubmit}>
          </input> :
          <h2 className={styles.taskTitle}>
            {todoTask.title}
          </h2>
        }
      </div>
      <Menu task={todoTask} />
    </li>
  )
}