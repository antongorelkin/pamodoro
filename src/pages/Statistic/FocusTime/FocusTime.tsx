import classNames from 'classnames';
import styles from './focusTime.module.css';
import Focus from '/src/assets/focus.svg';


type FocusTimeProps = {
  pauseSec: number,
  workInSec: number
}

export function FocusTime({ pauseSec, workInSec }: FocusTimeProps) {
  let focus = Math.floor(100 - (100 / workInSec * pauseSec));

  if (focus < 0 || isNaN(focus)) {
    focus = 0;
  }

  const focusClass = classNames(
    styles.focus,
    focus > 0 && styles.orange
  );

  const svg = classNames(
    focus > 0 && styles.svg,
  );


  return (
    <div className={focusClass}>
      <div className={styles.dscr}>
        <h3 className={styles.title}>
          Фокус
        </h3>
        <span className={styles.focusPercent}>
          {focus}%
        </span>
      </div>
      <Focus className={svg} />
    </div>
  )
}