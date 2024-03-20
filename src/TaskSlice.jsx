import { createSlice } from '@reduxjs/toolkit';

// Function to retrieve tasks from local storage
const loadTasksFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading tasks from local storage:', error);
    return [];
  }
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (error) {
    console.error('Error saving tasks to local storage:', error);
  }
};

const initialState = loadTasksFromLocalStorage();

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state); // Save tasks to local storage after adding
    },
    removeTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(newState); // Save tasks to local storage after removal
      return newState;
    },
    toggleTask: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveTasksToLocalStorage(newState); // Save tasks to local storage after toggling
      return newState;
    },
    updateTask: (state, action) => {
      const newState = state.map(task =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title, description: action.payload.description, priority: action.payload.priority }
          : task
      );
      saveTasksToLocalStorage(newState); // Save tasks to local storage after updating
      return newState;
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(newState); // Save tasks to local storage after deletion
      return newState;
    },
    searchTask: (state, action) => {
      return state.filter(task =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    sortTask: (state, action) => {
      switch (action.payload) {
        case 'date':
          state.sort((a, b) => a.id - b.id);
          break;
        case 'priority':
          state.sort((a, b) => a.priority.localeCompare(b.priority));
          break;
        case 'name':
          state.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
      saveTasksToLocalStorage(state); // Save tasks to local storage after sorting
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTask, deleteTask, sortTask, searchTask } = taskSlice.actions;

export default taskSlice.reducer;
