import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './slice/todosSlice';
import timingReducer from './slice/timingSlice';
import breakReducer from "./slice/breakSlice";
import statisticReducer from './slice/statSlice'


export const store = configureStore({
  reducer: {
    todos: todosReducer,
    timing: timingReducer,
    breaks: breakReducer,
    statistic: statisticReducer,
  },
  // preloadedState: loadFromLocalStorage()
})

// function saveToLocalStorage(state: RootState) {
//   try {
//     const serializedState = JSON.stringify(state);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem("persistentState", serializedState);
//     }
//   } catch (e) {
//     console.warn(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     if (typeof window !== 'undefined') {
//       const serializedState = localStorage.getItem("persistentState");
//       if (serializedState === null) return undefined;
//       return JSON.parse(serializedState);
//     }
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// store.subscribe(() => saveToLocalStorage(store.getState()));


export type RootState = ReturnType<typeof store.getState>;
export type TodoDispatch = typeof store.dispatch