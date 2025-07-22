import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    //slice created
    name:'user',
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    //reducer functions defined 
    reducers:{
        fetchUserStart(state){
            state.loading=true;
            state.error=null;
        },
        fetchUserSuccess(state,action){
            state.loading=false;
            state.users= action.payload;
        },
        fetchUserFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        },
    }
});

export const {fetchUserStart,fetchUserSuccess,fetchUserFailure}=userSlice.actions;
export default userSlice.reducer;