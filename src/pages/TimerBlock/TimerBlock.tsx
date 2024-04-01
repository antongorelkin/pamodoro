import { useAppSelector } from "../../hooks/useAppSelector";
import { ITodo } from "../../store/slice/todosSlice";
import { FormBlock } from "./FormBlock/FormBlock";
import { DefaultTimer } from "./Timer/DefaultTimer/DefaultTimer";
import styles from './TimerBlock.module.css'




export function TimerBlock() {
  const taskList = useAppSelector(state => state.todos.todos)

  return (
    <div className={styles.container}>
      <FormBlock />
      {taskList.length > 0 && <DefaultTimer />}
    </div>
  )
}