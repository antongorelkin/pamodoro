import { declinationOfNumber } from '../../../utils/declinationNumbers';
import styles from './pamodoro.module.css';
import Pomidor from '/src/assets/tomato_2.svg';
import PomidorDefault from '/src/assets/tomatoStat.svg';

type PamodoroProps = {
  pomodoroCount: number
}

export function Pamodoro({ pomodoroCount }: PamodoroProps) {
  return (
    <div className={styles.pomodoro}>
      {pomodoroCount > 0 ?
        <>
          <div className={styles.pomodoroImg}>
            <Pomidor />
            <span>x {pomodoroCount}</span>
          </div>
          <div className={styles.count}>
            <span>
              {pomodoroCount} {declinationOfNumber(pomodoroCount, ['помидор', 'помидора', 'помидоров'])}
            </span>
          </div>
        </> :
        <PomidorDefault />
      }
    </div>
  )
}