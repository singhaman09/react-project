// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useAuth();

  return (
    <div>
      {token && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
