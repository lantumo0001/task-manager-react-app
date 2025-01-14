import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from './TaskSlice';
const store = configureStore({
  reducer: {
    tasks: TaskReducer,
  }
});
export default store;