import classNames from "classnames";
import styles from './pause.module.css';
import Pause from '/src/assets/pause.svg';

type PauseProps = {
  pauseSec: number
}

export function PauseTime({ pauseSec }: PauseProps) {
  const hour = Math.floor((pauseSec / 3600) % 60);
  const min = Math.floor((pauseSec / 60) % 60);
  const sec = pauseSec % 60;

  const hourMin = `${hour}ч ${min}м`;
  const minSec = `${min}м ${sec}c`
  const timePause = hour < 1 ? minSec : hourMin;

  const pauseClass = classNames(
    styles.pause,
    pauseSec > 0 && styles.purple
  )

  const svg = classNames(
    pauseSec > 0 && styles.svg
  );

  return (
    <div className={pauseClass}>
      <div className={styles.dscr}>
        <h3 className={styles.title}>
          Время на паузе
        </h3>
        <span className={styles.time}>
          {timePause}
        </span>
      </div>
      <Pause className={svg} />
    </div>
  )
}