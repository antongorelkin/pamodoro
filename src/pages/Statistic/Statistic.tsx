import dayjs from 'dayjs';
import styles from './statistic.module.css';
import { IStatItem } from '../../store/slice/statSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useEffect, useReducer, useRef, useState } from 'react';
import ArrowUp from '/src/assets/arrowUp.svg';
import ArrowDown from '/src/assets/arrowDown.svg';
import { Day } from './Day/Day';
import { Chart } from './Chart/Chart';
import { Pamodoro } from './Pamodoro/Pamodoro';
import { FocusTime } from './FocusTime/FocusTime';
import { PauseTime } from './Pause/PauseTime';
import { StopTime } from './StopTime/StopTime';


dayjs.locale('ru');

const emptyDay: IStatItem = {
  date: dayjs().format('YYYY-MM-DD'),
  count: 0,
  stop_count: 0,
  work_time: 0,
  pause_time: 0,
}


export enum ChartMode {
  CurrentWeek,
  LastWeek,
  TwoWeeaksLater
};

const ChartModes = [
  {
    name: 'Эта неделя',
    value: ChartMode.CurrentWeek
  },
  {
    name: 'Прошедшая неделя',
    value: ChartMode.LastWeek
  },
  {
    name: '2 недели назад',
    value: ChartMode.TwoWeeaksLater
  }
];


export function Statistic() {
  const statItems = useAppSelector((state: { statistic: { items: any; }; }) => state.statistic.items);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [statDay, setStatDay] = useState(emptyDay);
  const [selectedDayName, setSelectedDayName] = useState(dayjs().format('dddd'));
  const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const StatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDayName(dayjs(selectedDate).format('dddd'));

    let findStatItem = statItems.find((item: any) => item.date === selectedDate);

    if (findStatItem) {
      setStatDay(findStatItem);
    } else {
      setStatDay({
        date: selectedDate,
        count: 0,
        stop_count: 0,
        work_time: 0,
        pause_time: 0
      })
    }
  }, [selectedDate]);

  useEffect(() => {
    switch (selectedChartMode) {
      case ChartMode.CurrentWeek:
        setSelectedDate(dayjs().format('YYYY-MM-DD'));
        break;
      case ChartMode.LastWeek:
        setSelectedDate(dayjs().subtract(7, 'days').format('YYYY-MM-DD'));
        break;
      case ChartMode.TwoWeeaksLater:
        setSelectedDate(dayjs().subtract(14, 'days').format('YYYY-MM-DD'));
        break;
    }
  }, [selectedChartMode]);

  const handleSelectedDateHandler = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  }

  const handleSelectMode = (selectedMode: ChartMode) => {
    setSelectedChartMode(selectedMode);
    setIsSelectOpen(false);
  };

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !StatRef.current?.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.statHeader}>
        <h2 className={styles.title}>
          Ваша активность
        </h2>
        <div className={styles.dropDown} ref={StatRef}>
          <div className={styles.dropdownMenu} onClick={() => setIsSelectOpen(true)}>
            {ChartModes.find(chartMode => chartMode.value === selectedChartMode)?.name}
            <div className={styles.arrows}>
              {isSelectOpen ?
                <ArrowUp /> : <ArrowDown />
              }
            </div>
          </div>

          {isSelectOpen && (
            <ul className={styles.menu}>
              {ChartModes.map(item => {
                return (
                  <li className={styles.menuItem}>
                    <button
                      className={styles.menuBtn}
                      key={item.value}
                      onClick={() => {
                        handleSelectMode(item.value)
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.parts}>
        <Day selectedDay={selectedDayName} workSec={statDay.work_time} />
        <Chart selectedDate={selectedDate} selectedChartMode={selectedChartMode} changeSelectedDate={handleSelectedDateHandler} />
        <Pamodoro pomodoroCount={statDay.count} />

        <FocusTime pauseSec={statDay.pause_time} workInSec={statDay.work_time} />
        <PauseTime pauseSec={statDay.pause_time} />
        <StopTime stopCount={statDay.stop_count} />
      </div>
    </div>
  )
}