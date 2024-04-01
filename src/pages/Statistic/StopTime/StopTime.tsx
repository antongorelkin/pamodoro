import classNames from 'classnames';
import styles from './stop.module.css';
import Stop from '/src/assets/stop.svg';

type StopProps = {
  stopCount: number
}

export function StopTime({ stopCount }: StopProps) {

  const stopClass = classNames(
    styles.stop,
    stopCount > 0 && styles.blue,
  );

  const svg = classNames(
    stopCount > 0 && styles.svg
  );


  return (
    <div className={stopClass}>
      <div className={styles.dscr}>
        <h3 className={styles.title}>
          Остановки
        </h3>
        <span className={styles.stops}>
          {stopCount}
        </span>
      </div>
      <Stop className={svg} />
    </div>
  )
}