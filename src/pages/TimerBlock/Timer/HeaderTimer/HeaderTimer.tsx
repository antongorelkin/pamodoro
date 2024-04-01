import { useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ITodo } from "../../../../store/slice/todosSlice";
import styles from './headerTimer.module.css';
import classNames from 'classnames'

interface IHeaderProps {
  task: ITodo,
  isTimeToBreak: boolean,
  currentBreak: number,
  currentPomodoro: number,
  isStarted: boolean,
  isPaused: boolean,
  isBreakStarted: boolean
}

export function HeaderTimer({ task, isTimeToBreak, currentBreak, currentPomodoro, isStarted, isPaused, isBreakStarted }: IHeaderProps) {

  const headerClasses = classNames(
    styles.headerTimer,
    { [styles.headerNotStart]: !isStarted },
    { [styles.headerStart]: isStarted },
    { [styles.headerBreak]: isBreakStarted }
  );


  return (
    <div className={headerClasses}>
      <p className={styles.taskName}>
        {task.title}
      </p>

      {isTimeToBreak ?
        <span className={styles.pomidorCount}>Перерыв {currentBreak}</span> :
        <span className={styles.pomidorCount}>Помидор {currentPomodoro} </span>}
    </div>
  )
}