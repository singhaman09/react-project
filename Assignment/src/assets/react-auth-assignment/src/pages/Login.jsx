import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      dispatch(login({ email, password }));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 border shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600">{error}</p>}
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full rounded">Login</button>
      </div>
    </div>
  );
}
