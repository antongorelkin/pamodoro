import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";


interface ITimingState {
  pomodoroMin: number,
  smallBreak: number,
  largeBreak: number
}

const initialTimingState: ITimingState = {
  pomodoroMin: 25,
  smallBreak: 5,
  largeBreak: 30,
}

export const timingSlice = createSlice({
  name: 'timing',
  initialState: initialTimingState,
  reducers: {
    setStatePomodoroMin: (state, action: PayloadAction<number>) => {
      state.pomodoroMin = action.payload;
    },
    setStateSmallBreak: (state, action: PayloadAction<number>) => {
      state.smallBreak = action.payload
    },
    setStateLargeBreak: (state, action: PayloadAction<number>) => {
      state.largeBreak = action.payload
    }
  }
});

export const { setStatePomodoroMin, setStateSmallBreak, setStateLargeBreak } = timingSlice.actions;

export const timing = (state: RootState) => state.timing;

export default timingSlice.reducer;