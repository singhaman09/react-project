import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = contactSlice.actions;
export default contactSlice.reducer;
