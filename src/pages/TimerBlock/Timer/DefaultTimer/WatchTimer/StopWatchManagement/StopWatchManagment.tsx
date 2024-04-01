import classNames from "classnames";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import styles from './stopWatchManagment.module.css';
import { increaseStopCount } from "../../../../../../store/slice/statSlice";

interface IStopWatchManagement {
  name: string,
  onClick: () => void,
  disabled: boolean
};

interface IStopwatchManagementProps {
  isTimeToBreak: boolean;
  setIsBreakStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerInSec: React.Dispatch<React.SetStateAction<number>>;
  setIsBreakPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  handleCompleteBreak: () => void;
  handleCompleteTask: () => void;
  isPaused: boolean;
  isStarted: boolean;
  isBreakPaused: boolean;
  isBreakStarted: boolean;
}

export function StopWatchManagment(props: IStopwatchManagementProps) {
  const {
    isTimeToBreak,
    setIsBreakStarted,
    setIsStarted,
    setTimerInSec,
    setIsBreakPaused,
    setIsPaused,
    handleCompleteBreak,
    handleCompleteTask,
    isPaused,
    isStarted,
    isBreakPaused,
    isBreakStarted
  } = props

  const pomodoroInMin = useAppSelector(state => state.timing.pomodoroMin);
  const dispatch = useAppDispatch();

  function handleStart() {
    if (isTimeToBreak) {
      setIsBreakStarted(true);
    }
    else { setIsStarted(true) };
  }

  function handlePause() {
    if (isTimeToBreak) {
      setIsBreakPaused(true)
    } else setIsPaused(true)
  }

  function handleStop() {
    setIsStarted(false);
    setTimerInSec(pomodoroInMin * 60);
    dispatch(increaseStopCount())
  }

  function handleContinue() {
    if (isTimeToBreak) {
      setIsBreakPaused(false)
    } else setIsPaused(false);
  }

  let btnStart: IStopWatchManagement = {
    name: 'Старт',
    onClick: handleStart,
    disabled: false
  }

  let btnStop: IStopWatchManagement = {
    name: isTimeToBreak ? 'Пропустить' : 'Стоп',
    onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
    disabled: !isTimeToBreak
  }

  if (isPaused || isBreakPaused) {
    btnStart = {
      name: 'Продолжить',
      onClick: handleContinue,
      disabled: false
    }

    btnStop = {
      name: isTimeToBreak ? 'Пропустить' : 'Сделано',
      onClick: isTimeToBreak ? handleCompleteBreak : handleCompleteTask,
      disabled: false
    }
  } else if (isStarted || isBreakStarted) {
    btnStart = {
      name: 'Пауза',
      onClick: handlePause,
      disabled: false
    }

    btnStop = {
      name: isTimeToBreak ? 'Пропустить' : 'Стоп',
      onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
      disabled: false
    }
  }

  const btnRigth = classNames(
    styles.btnTimer,
    styles.btnRed
  );


  const btnLeft = classNames(
    styles.btnTimer,
    styles.btnGreen
  );

  return (
    <div className={styles.btnContainer}>
      <button
        className={btnLeft}
        onClick={btnStart.onClick}
        disabled={btnStart.disabled}>
        {btnStart.name}
      </button>
      <button
        className={btnRigth}
        onClick={btnStop.onClick}
        disabled={btnStop.disabled}>
        {btnStop.name}
      </button>
    </div>
  )
}