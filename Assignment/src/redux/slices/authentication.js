import { createSlice } from "@reduxjs/toolkit";

const whitelist=[
  { email: "singh@gmail.com", password: "s@123" },
  { email: "test@gmail.com", password: "t@123" }
]

const initialAuth = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login: (state,action) => { 
      const user=whitelist.find((u)=> u.email===action.payload.email && 
      u.password===action.payload.password
    );

    if(user){
      state.isAuthenticated=true;
      state.user={email:user.email};
      localStorage.setItem("auth",JSON.stringify(state));
    }
    else{
      throw new Error("Invalid Credentials")
    }
    },
    logout: (state) => { state.isAuthenticated = false; 
      state.user=null;
      localStorage.removeItem("auth");
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
