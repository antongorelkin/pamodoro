import { useContext } from "react";
import { ITodo } from "../../../../../../store/slice/todosSlice";
import { currentContext } from "../../../../../../context/currentContext";
import styles from './titleTask.module.css';

interface ITitleTaskProps {
  task: ITodo
}

export function TitleTask({ task }: ITitleTaskProps) {
  const { currentTask } = useContext(currentContext);

  return (
    <div className={styles.titleTask}>
      <span><span className={styles.taskNumber}>Задача {currentTask + 1} - </span>{task.title}</span>
    </div>
  )
}