import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import Focusable from "../component/focusable";

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { ref, focusKey } = useFocusable({
    focusKey: "LOGIN_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "login-email",
  });

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    login(() => navigate("/country"));
  };

  // Handle Enter key on inputs
  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFocus("login-password");
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  // Set initial focus
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus("login-email");
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>
            <p className="text-gray-300 mb-6 text-center">
              Enter any email and password to continue.
            </p>

            <div className="space-y-4">
              <Focusable focusKey="login-email">
                {(focused) => (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    placeholder="Email"
                    autoComplete="email"
                    className={`w-full px-4 py-3 rounded bg-gray-900 text-white outline-none border transition-all ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400 bg-gray-800"
                        : "border-gray-600"
                    }`}
                  />
                )}
              </Focusable>

              <Focusable focusKey="login-password">
                {(focused) => (
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handlePasswordKeyDown}
                    placeholder="Password"
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 rounded bg-gray-900 text-white outline-none border transition-all ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400 bg-gray-800"
                        : "border-gray-600"
                    }`}
                  />
                )}
              </Focusable>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/30 p-3 rounded">
                  {error}
                </div>
              )}

              <Focusable focusKey="login-button" onEnterPress={handleLogin}>
                {(focused) => (
                  <button
                    onClick={handleLogin}
                    className={`w-full py-3 rounded text-white font-semibold transition-all ${
                      focused 
                        ? "bg-blue-700 ring-2 ring-blue-400 scale-105" 
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Login
                  </button>
                )}
              </Focusable>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default Login;