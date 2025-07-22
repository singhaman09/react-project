import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = () => {
    try {
      dispatch(login(formData)); // Just dispatch, don’t navigate yet
      setError(""); // Clear error if trying again
      toast.success("Logged In!",{
        toastId: 'success1',
      })
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  const navigateToHome = () => {
    navigate("/");
  };

  //useEffect will fire when isAuthenticated becomes true
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300 rounded-lg">
      <div className="flex flex-col border-2 p-10 space-y-4 w-full max-w-md shadow-md rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-4">Login Page</h1>
        
        {error && (
          <p className="text-red-600 font-semibold text-sm text-center">{error}</p>
        )}

        <input
          className="border border-purple-900 p-3 rounded focus:outline-none"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="border border-purple-900 p-3 rounded focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white p-3 rounded hover:bg-purple-800 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={navigateToHome}
          className="bg-purple-600 text-white p-3 rounded hover:bg-purple-800 cursor-pointer"
        >
          Home
        </button>
      </div>
    </div>
  );
}
