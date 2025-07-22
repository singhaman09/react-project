import { ADD_TASK, REMOVE_TASK } from '../actions/action';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [], // Persist tasks from localStorage
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to localStorage
      return { ...state, tasks: updatedTasks };
      
    case REMOVE_TASK:
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(filteredTasks)); // Save updated tasks to localStorage
      return { ...state, tasks: filteredTasks };

    default:
      return state;
  }
};

export default taskReducer;