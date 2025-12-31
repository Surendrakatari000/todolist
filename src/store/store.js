import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slices/todo";
import { loadState, saveState } from "./localstorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    Todo: TodoSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    Todo: store.getState().Todo,
  });
});

export default store;
