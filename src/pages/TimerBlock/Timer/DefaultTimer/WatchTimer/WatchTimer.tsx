import { ITodo } from "../../../../../store/slice/todosSlice";
import { StopTimer } from "./StopTimer/StopTimer";
import { StopWatchManagment } from "./StopWatchManagement/StopWatchManagment";
import { TitleTask } from "./TitleTask/TitleTask";
import styles from './watchTimer.module.css';


interface IDefaultTimerProps {
  timerInSec: number,
  task: ITodo,
  isTimeToBreak: boolean,
  isPaused: boolean,
  isStarted: boolean,
  isBreakPaused: boolean,
  isBreakStarted: boolean,
  setIsBreakStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setTimerInSec: React.Dispatch<React.SetStateAction<number>>,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBreakPaused: React.Dispatch<React.SetStateAction<boolean>>,
  handleBreakComplete: () => void,
  handleTaskFinished: () => void
}


export function WatchTimer(props: IDefaultTimerProps) {
  const {
    timerInSec,
    task,
    isTimeToBreak,
    isPaused,
    isStarted,
    isBreakPaused,
    isBreakStarted,
    setIsBreakStarted,
    setIsStarted,
    setTimerInSec,
    setIsPaused,
    setIsBreakPaused,
    handleBreakComplete,
    handleTaskFinished
  } = props;


  return (
    <div className={styles.timerContainer}>
      <StopTimer
        timerInSec={timerInSec}
        isStarted={isStarted}
        isPaused={isPaused}
        isBreakPaused={isBreakPaused}
        isBreakStarted={isBreakStarted}
      />

      <TitleTask task={task} />

      <StopWatchManagment
        isTimeToBreak={isTimeToBreak}
        setIsBreakStarted={setIsBreakStarted}
        setIsStarted={setIsStarted}
        setTimerInSec={setTimerInSec}
        setIsBreakPaused={setIsBreakPaused}
        setIsPaused={setIsPaused}
        handleCompleteBreak={handleBreakComplete}
        handleCompleteTask={handleTaskFinished}
        isPaused={isPaused}
        isStarted={isStarted}
        isBreakPaused={isBreakPaused}
        isBreakStarted={isBreakStarted}
      />
    </div>
  )
}