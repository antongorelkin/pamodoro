import { declinationOfNumber } from '../../../utils/declinationNumbers';
import styles from './day.module.css';

type StatPomodoroProps = {
  selectedDay: string,
  workSec: number
};

export function Day({ selectedDay, workSec }: StatPomodoroProps) {

  const hour = Math.floor((workSec / 3600) % 60);
  const min = Math.floor((workSec / 60) % 60);
  const sec = workSec % 60;

  const hourMin = `${hour} ${declinationOfNumber(hour, ['часа', 'часов', 'часов'])} ${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])}`;
  const minSec = `${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])} ${sec} ${declinationOfNumber(sec, ['секунды', 'секунд', 'секунд'])}`
  const timeString = hour < 1 ? minSec : hourMin;


  return (
    <div className={styles.totalTime}>
      <h3 className={styles.title}>
        {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
      </h3>
      {workSec > 0 ?
        <p className={styles.information}>
          Вы работали над задачами в&nbsp;течение
          <span className={styles.time}> {timeString}
          </span>
        </p> :
        <p className={styles.information}>Нет данных</p>
      }
    </div>
  )
}