import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { ITodo } from "../../../../../store/slice/todosSlice";
import styles from './timecounter.module.css';


export function TimeCounter() {
  const taskList = useAppSelector(state => state.todos.todos);
  const [timeCounter, setTimeCounter] = useState({ pamodoro: 0, hour: 0, min: 0 });
  const pamodoroInMin = useAppSelector(state => state.timing.pomodoroMin);

  useEffect(() => {
    let newTimeCounter = {
      pamodoro: 0,
      hour: 0,
      min: 0
    }

    taskList.map((task: ITodo) => (
      newTimeCounter.pamodoro += task.count
    ));

    let totalMin = newTimeCounter.pamodoro * pamodoroInMin;
    newTimeCounter.hour = Math.floor(totalMin / 60);
    newTimeCounter.min = totalMin % 60;

    setTimeCounter(newTimeCounter);
  }, [taskList]);

  return (
    <div className={styles.time}>
      {timeCounter.hour > 0 && <span>{timeCounter.hour} час</span>}
      {timeCounter.min > 0 && <span>{timeCounter.min} мин</span>}
    </div>
  )
}

