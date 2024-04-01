import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";


interface IBreakProps {
  breakCounter: number,
}

const initialStateBreak: IBreakProps = {
  breakCounter: 0
}

export const breakSlice = createSlice({
  name: 'breaks',
  initialState: initialStateBreak,
  reducers: {
    incrementBreaksCounter: (state) => {
      state.breakCounter++;
    }
  }
});


export const { incrementBreaksCounter } = breakSlice.actions;

export const breaks = (state: RootState) => state.breaks;

export default breakSlice.reducer;