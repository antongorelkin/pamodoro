import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ChartMode } from "../Statistic"
import dayjs from "dayjs";
import styles from './chart.module.css';
import classNames from "classnames";


type ChartProps = {
  selectedDate: string,
  selectedChartMode: ChartMode,
  changeSelectedDate: (selectedDate: string) => void,
};

type DayOfWeek = {
  date: string,
  name: string,
  active: boolean,
  workSec: number
};

let daysOfWeek: DayOfWeek[] = [];
let maxWorkSec = 0;

export function Chart({ selectedDate, changeSelectedDate, selectedChartMode }: ChartProps) {
  const statItems = useAppSelector(state => state.statistic.items);

  useEffect(() => {
    daysOfWeek = [];
    let subtractDays = 0;

    switch (selectedChartMode) {
      case ChartMode.CurrentWeek:
        subtractDays = 0;
        break;
      case ChartMode.LastWeek:
        subtractDays = 7;
        break;
      case ChartMode.TwoWeeaksLater:
        subtractDays = 14;
        break;
    };

    for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
      let weekDayDate = dayjs().subtract(subtractDays, 'days').day(dayNumber).format('YYYY-MM-DD');
      let weekDayName = dayjs().subtract(subtractDays, 'days').day(dayNumber).format('ddd');
      let workSec = 0;

      let findStatItem = statItems.find(item => item.date === weekDayDate);

      if (findStatItem) {
        workSec = findStatItem.work_time;
      }

      daysOfWeek.push({
        date: weekDayDate,
        name: weekDayName,
        active: selectedDate === weekDayDate,
        workSec: workSec
      })
    }

    maxWorkSec = daysOfWeek.reduce((prev, current) => prev > current.workSec ? prev : current.workSec, 0)

  }, [selectedDate, selectedChartMode]);

  function secToTime(sec: number) {
    let hour = Math.floor(sec / 60);
    let min = Math.round(sec % 60);

    return `${hour} ч ${min} мин`;
  };

  function calcHeight(sec: number, maxSec: number) {
    let maxHeight = 365;
    let height = maxHeight / maxSec * sec;

    return height > 0 ? height : 5;
  }
  return (
    <div className={styles.chart}>
      <div className={styles.grid}>
        <div className={styles.line}>
          <span className={styles.time}>
            {secToTime(maxWorkSec)}
          </span>
        </div>
        <div className={styles.line}>
          <span
            className={styles.time}>
            {secToTime(maxWorkSec / 4 * 3)}
          </span>
        </div>
        <div className={styles.line}>
          <span
            className={styles.time}>
            {secToTime(maxWorkSec / 4 * 2)}
          </span>
        </div >
        <div className={styles.line}>
          <span
            className={styles.time}>
            {secToTime(maxWorkSec / 4)}
          </span>
        </div >
      </div>
      <div className={styles.weekDay}>
        {daysOfWeek.map(item => {
          let className = classNames(
            styles.class,
            item.active ? (calcHeight(item.workSec, maxWorkSec) > 5 && styles.red) : (calcHeight(item.workSec, maxWorkSec) > 5 && styles.redLight)
          );

          let text = classNames(
            styles.text,
            item.active ? (styles.text && styles.redText) : styles.text
          );
          return (
            <div key={item.date} onClick={() => { changeSelectedDate(item.date) }} className={styles.weekdayTransfer}>
              <span className={text}>{item.name}</span>
              <div className={className} style={{ height: calcHeight(item.workSec, maxWorkSec) + 'px' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}