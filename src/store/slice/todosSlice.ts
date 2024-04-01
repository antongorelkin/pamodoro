import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ITodo = {
  id: string,
  title: string,
  count: number,
  task_fihished: number,
  edit: boolean
}

interface ITodoState {
  todos: ITodo[]
}

export const initialTodoState: ITodoState = {
  todos: []
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialTodoState,
  reducers: {
    addTask: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },

    removeTask: (state, action: PayloadAction<string>) => {

      let id = action.payload;

      state.todos = state.todos.filter((item) => {
        return item.id !== id;
      })
    },

    incrementTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;

      let findIndex = state.todos.find((task) => task.id === id);

      if (findIndex) {
        findIndex.count++;
      }
    },

    decrementTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findIndex = state.todos.find((task) => task.id === id);

      if (findIndex) {
        findIndex.count--;
      }
    },

    editTask: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let findIndex = state.todos.find((task) => task.id === id);

      if (findIndex) {
        findIndex.edit = true;
      }
    },

    renameTask: (state, action: PayloadAction<{ id: string, title: string }>) => {
      let { id, title } = action.payload;
      let findTask = state.todos.find(task => task.id === id);

      if (findTask) {
        findTask.edit = false;
        findTask.title = title;
      }
    },

    indexTask: (state, action: PayloadAction<string>) => {
      let id = action.payload

      state.todos.findIndex((task) => task.id === task.id);
    },

    finishedTask: (state, action: PayloadAction<string>) => {
      let id = action.payload

      let findTask = state.todos.find(task => task.id === id);

      if (findTask) {
        findTask.task_fihished++;
      }
    }
  }
})

export const {
  addTask,
  removeTask,
  incrementTask,
  decrementTask,
  editTask,
  indexTask,
  renameTask,
  finishedTask
} = todosSlice.actions

export const todos = (state: RootState) => state.todos;

export default todosSlice.reducer