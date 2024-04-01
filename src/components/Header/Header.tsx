import { Link } from 'react-router-dom';
import styles from './header.module.css';
import Pomidor from '/src/assets/tomato.svg';
import Equalaiser from '/src/assets/equalizer.svg';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Link className={styles.headerTitle} to={'/'}>
          <Pomidor className={styles.headerLogo} />
          pomodoro_box
        </Link>
      </div>
      <Link to={"/statistic"} className={styles.headerLink} >
        <Equalaiser className={styles.equalizer} />
        Статистика
      </Link>

    </div>
  )
}