import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../store";


export type IStatItem = {
  date: string,
  count: number,
  stop_count: number,
  work_time: number,
  pause_time: number,
};

interface IStatState {
  items: IStatItem[]
}

const currentDateStateItem: IStatItem = {
  date: dayjs().format('YYYY-MM-DD'),
  count: 0,
  stop_count: 0,
  work_time: 0,
  pause_time: 0
}

const initialStatState: IStatState = {
  items: [currentDateStateItem]
}

export const statSlice = createSlice({
  name: 'statistic',
  initialState: initialStatState,
  reducers: {
    setCurrentDateEmpty: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        state.items.push(currentDateStateItem);
      }
    },

    increasePomodoroCounter: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.count++
      }
    },

    increaseStopCounter: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.count++
      }
    },

    increaseStatPauseTime: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.pause_time++
      }
    },

    increaseStopCount: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.stop_count++
      }
    },

    increaseWorkTime: (state) => {
      let currentDate = dayjs().format('YYYY-MM-DD');
      let findStatItem = state.items.find(statItem => statItem.date === currentDate);

      if (findStatItem) {
        findStatItem.work_time++
      }
    }
  }
});

export const { setCurrentDateEmpty, increaseWorkTime, increaseStopCount, increaseStatPauseTime, increaseStopCounter, increasePomodoroCounter } = statSlice.actions;

export const statistic = (state: RootState) => state.statistic;

export default statSlice.reducer;