import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardStats: {
    totalUsers:10,
    toalSubscribedUsers:4,
    totalDeletedUsers:8,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDashboard: (state,actions) => {
        state.dashboardStats=actions.payload;
    },
    
  },
});

export const { updateDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
