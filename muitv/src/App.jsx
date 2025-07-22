
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CountryList from "./pages/Countrylist";
import CountryDetail from "./pages/CountryDetail";
import UserList from "./pages/Userlist";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import { Box } from "@mui/material";

function App() {
  return (
    <AppProvider>
      <Box sx={{ minHeight: "100vh", bgcolor: "#000000", color: "#ffffff", width: "100%", maxWidth: "100vw", margin: 0, overflowX: "hidden" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/country"
            element={
              <PrivateRoute>
                <CountryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/country/:name"
            element={
              <PrivateRoute>
                <CountryDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </AppProvider>
  );
}

export default React.memo(App);
