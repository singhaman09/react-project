import { createSlice } from "@reduxjs/toolkit";

// Load students from localStorage
const loadStudents = () => {
  const data = localStorage.getItem("students");

  return data ? JSON.parse(data) : [];
};

const studentSlice = createSlice({
  name: "students",
  initialState: loadStudents(),
  reducers: {
    
    //handles adding, use unshift - to add at top
    addStudent: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem("students", JSON.stringify(state));
      
    },
    //handles editing
    editStudent: (state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
      localStorage.setItem("students", JSON.stringify(state));
    },
    //handles deletion
    deleteStudent: (state, action) => {
      const filtered = state.filter((s) => s.id !== action.payload);
      localStorage.setItem("students", JSON.stringify(filtered));
      return filtered;
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
