// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@shop.com" && pass === "1234") {
      login("dummy-token");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input className="border p-2 mb-4 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-4 w-full" placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
