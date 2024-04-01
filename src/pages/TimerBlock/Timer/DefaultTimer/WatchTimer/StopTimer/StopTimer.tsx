import classNames from "classnames";
import styles from './stopTimer.module.css';
import Config from '/src/assets/config.svg';

interface IStopTimerProps {
  timerInSec: number,
  isStarted: boolean,
  isPaused: boolean,
  isBreakPaused: boolean,
  isBreakStarted: boolean
}

export function StopTimer({ timerInSec, isStarted, isPaused, isBreakPaused, isBreakStarted }: IStopTimerProps) {

  function formatTimer() {
    let minutes = parseInt(String(timerInSec / 60));
    let seconds = timerInSec % 60;

    let strSec = seconds < 10 ? '0' + seconds : '' + seconds;
    let strMin = minutes < 10 ? '0' + minutes : '' + minutes;

    return strMin + ':' + strSec;
  }


  const StopTimerClasses = classNames(
    styles.stopTimer,

    { [styles.stopTimerRed]: isStarted && !isPaused },
    { [styles.stopTimerGreen]: isBreakStarted && !isBreakPaused }
  );

  return (
    <div className={StopTimerClasses}>
      {formatTimer()}
      <button className={styles.btnPlus}>
        <Config className={styles.btnImage} />
      </button>
    </div>
  )
}