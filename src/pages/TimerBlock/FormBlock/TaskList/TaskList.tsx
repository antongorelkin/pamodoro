import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ITodo } from "../../../../store/slice/todosSlice";
import { Task } from "./Task/Task";
import styles from './tasklist.module.css'


export function TaskList() {
  const taskList = useAppSelector(state => state.todos.todos);

  return (
    <ul className={styles.taskList}>
      {taskList.map((task: ITodo) => (
        <Task key={task.id}
          todoTask={task} />
      ))}
    </ul>
  )
}