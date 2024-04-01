import { SetStateAction, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { ITodo, finishedTask, removeTask } from "../../../../store/slice/todosSlice";
import { HeaderTimer } from "../HeaderTimer/HeaderTimer";
import styles from './defaultTimer.module.css'
import { StopTimer } from "./WatchTimer/StopTimer/StopTimer";
import { WatchTimer } from "./WatchTimer/WatchTimer";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { currentContext } from "../../../../context/currentContext";
import { increasePomodoroCounter, increaseStatPauseTime, increaseStopCount, increaseWorkTime } from "../../../../store/slice/statSlice";
import { incrementBreaksCounter } from "../../../../store/slice/breakSlice";




export function DefaultTimer() {

  const taskList = useAppSelector(state => state.todos.todos);
  const breakCounter = useAppSelector(state => state.breaks.breakCounter);
  const pomodoroMin = useAppSelector(state => state.timing.pomodoroMin);
  const smallBreak = useAppSelector(state => state.timing.smallBreak);
  const largeBreak = useAppSelector(state => state.timing.largeBreak);
  const dispatch = useAppDispatch();
  const { currentTask } = useContext(currentContext);


  const [breakInMin, setBreakInMin] = useState(breakCounter % 4 ? smallBreak : largeBreak)
  const [task, setTask] = useState(taskList[0]);
  const [currentPomodoro, setCurrentPomodoro] = useState(task.task_fihished + 1);
  const [currentBreak, setCurrentBreak] = useState(breakCounter + 1);
  const [isTimeToBreak, setIsTimeToBreak] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [isBreakPaused, setIsBreakPaused] = useState(false);
  const [timerInSec, setTimerInSec] = useState(pomodoroMin * 60);
  const [minTime, setIsMinTime] = useState(pomodoroMin);

  useEffect(() => {
    setTimerInSec(pomodoroMin * 60);
  }, [pomodoroMin]);

  useEffect(() => {
    setTask(taskList[currentTask] || taskList[0])
  })

  useEffect(() => {
    let timerId = setInterval(() => {
      if ((isStarted && !isPaused && timerInSec > 0) || (isBreakStarted && !isBreakPaused && timerInSec > 0)) {
        setTimerInSec(timerInSec - 1);
      }

      if (!isTimeToBreak) {
        dispatch(increaseWorkTime())
      }

      if (isPaused) {
        dispatch(increaseStatPauseTime())
      }

      if (isStarted && timerInSec === 0) {
        handleTaskFinished();
      }

      if (isBreakStarted && timerInSec === 0) {
        handleBreakComplete()
      }
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [isStarted, isPaused, isBreakStarted, isBreakPaused, timerInSec, pomodoroMin, minTime]);

  function handleTaskFinished() {
    setIsPaused(false);
    setIsStarted(false);
    setTimerInSec(breakInMin * 60);
    setIsTimeToBreak(true);

    if (currentPomodoro === task.count) {
      dispatch(removeTask(task.id));
    } setCurrentPomodoro(currentPomodoro + 1);

    dispatch(finishedTask(task.id));
    dispatch(increasePomodoroCounter())
  }


  function handleBreakComplete() {
    setIsBreakPaused(false);
    setIsBreakStarted(false);
    setIsTimeToBreak(false);
    setTimerInSec(pomodoroMin * 60);
    dispatch(incrementBreaksCounter());
    dispatch(increaseStopCount())
  }


  return (
    <div className={styles.defaultTimer}>

      <HeaderTimer
        task={task}
        isTimeToBreak={isTimeToBreak}
        currentBreak={currentBreak}
        currentPomodoro={currentPomodoro}
        isStarted={isStarted}
        isPaused={isPaused}
        isBreakStarted={isBreakStarted}
      />

      <WatchTimer
        timerInSec={timerInSec}
        isStarted={isStarted}
        isBreakPaused={isBreakPaused}
        isPaused={isPaused}
        isBreakStarted={isBreakStarted}
        task={task}
        isTimeToBreak={isTimeToBreak}
        setIsBreakStarted={setIsBreakStarted}
        setTimerInSec={setTimerInSec}
        setIsStarted={setIsStarted}
        setIsPaused={setIsPaused}
        handleBreakComplete={handleBreakComplete}
        handleTaskFinished={handleTaskFinished}
        setIsBreakPaused={setIsBreakPaused}
      />
    </div>
  )
}