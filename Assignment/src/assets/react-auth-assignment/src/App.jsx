import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div className="p-6">Welcome to Dashboard</div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
