import Home from "./pages/home";
import Login from "./pages/login";
import ContactUs from "./pages/contact";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contact"
          element={
              <ContactUs/>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
    </BrowserRouter>
    
  );
}
