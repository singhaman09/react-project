import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CountryList from "./pages/Countrylist";
import CountryDetail from "./pages/CountryDetail";
import UserList from "./pages/Userlist";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import { useEffect, useState } from "react";
import { initSpatialNavigation } from "../spatialNavigationInit";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize spatial navigation
    initSpatialNavigation();
    setInitialized(true);

    // Cleanup function
    return () => {
      if (window.spatialNavCleanup) {
        window.spatialNavCleanup();
      }
    };
  }, []);

  // Add global styles for focus indicators
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .focused {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
      
      /* Hide default focus outline */
      *:focus {
        outline: none !important;
      }
      
      /* Custom scrollbar for better TV experience */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #374151;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #6b7280;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Initializing navigation...</div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-black text-white">
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
      </div>
    </AppProvider>
  );
}

export default App;