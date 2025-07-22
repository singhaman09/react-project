import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CountryList from "./pages/Countrylist";
import CountryDetail from "./pages/CountryDetail";
import UserList from "./pages/Userlist";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";

function App() {

  return (
    <div>
      Hello App 
    </div>
  )
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
