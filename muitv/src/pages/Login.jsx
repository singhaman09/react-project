import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
  doesFocusableExist,
} from "@noriginmedia/norigin-spatial-navigation";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";

// Custom Focusable wrapper
const Focusable = React.memo(({ focusKey, onEnterPress, children }) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress,
    onArrowPress: () => true,
  });

  useEffect(() => {
    if (focused && (focusKey === "login-email" || focusKey === "login-password")) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
          if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
            window.webOS.keyboard.show();
          }
        }
      }, 50);
    }
  }, [focused, focusKey, ref]);

  return (
    <div ref={ref} tabIndex={-1}>
      {children(focused, { ref })}
    </div>
  );
});

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    login(() => navigate("/country"));
  }, [email, password, login, navigate]);

  const { ref, focusKey } = useFocusable({
    focusKey: "LOGIN_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "login-email",
  });

  useEffect(() => {
    setTimeout(() => {
      if (doesFocusableExist("login-email")) {
        setFocus("login-email");
      }
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#ffffff",
          color: "#f97316",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#000000",
            fontWeight: 900,
            textAlign: "center",
            mt: 6,
            mb: 4,
            fontSize: { xs: "2.5rem", sm: "3.75rem" }, // text-5xl sm:text-6xl
          }}
        >
          Welcome to LG Smart TV Setup
        </Typography>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 480,
              bgcolor: "#ffffff",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)", // shadow-2xl
              borderRadius: 4, // rounded-2xl
              py: 8,
              px: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)", // hover:scale-[1.02]
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#000000",
                fontWeight: 800,
                textAlign: "center",
                fontSize: "1.5rem", // text-2xl
                animation: "pulse 1.5s infinite",
              }}
            >
              Sign in to continue your journey
            </Typography>

            <Focusable
              focusKey="login-email"
              onEnterPress={() => {
                if (!email.trim()) {
                  const input = document.getElementById("loginEmailInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-password");
                }
              }}
            >
              {(focused, { ref }) => (
                <TextField
                  inputRef={ref}
                  id="loginEmailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  inputProps={{ inputMode: "email" }}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 3,
                      bgcolor: "#f3f4f6",  
                      color: "#111827",  
                      border: `2px solid ${focused ? "#f97316" : "#e5e7eb"}`,  
                      px: 3,
                      py: 2.5,
                      fontSize: "1.5rem",  
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#fb923c",  
                        bgcolor: "#f9fafb" 
                      },
                      "&.Mui-focused": {
                        borderColor: "#f97316",
                        boxShadow: "0 0 8px rgba(249, 115, 22, 0.3)",  
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9ca3af", 
                    },
                  }}
                />
              )}
            </Focusable>

            <Focusable
              focusKey="login-password"
              onEnterPress={() => {
                if (!password.trim()) {
                  const input = document.getElementById("loginPasswordInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-button");
                }
              }}
            >
              {(focused, { ref }) => (
                <TextField
                  inputRef={ref}
                  id="loginPasswordInput"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  inputProps={{ inputMode: "text" }}
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 3,
                      bgcolor: "#f3f4f6",
                      color: "#111827",
                      border: `2px solid ${focused ? "#f97316" : "#e5e7eb"}`,
                      px: 3,
                      py: 2.5,
                      fontSize: "1.5rem",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#fb923c",
                        bgcolor: "#f9fafb",
                      },
                      "&.Mui-focused": {
                        borderColor: "#f97316",
                        boxShadow: "0 0 8px rgba(249, 115, 22, 0.3)",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "#9ca3af",
                    },
                  }}
                />
              )}
            </Focusable>

            {error && (
              <Alert
                severity="error"
                sx={{
                  bgcolor: "#fee2e2",  
                  color: "#ef4444", 
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  textAlign: "center",
                  borderRadius: 2,
                  p: 1,
                  animation: "bounce 0.5s",
                }}
              >
                {error}
              </Alert>
            )}

            <Focusable focusKey="login-button" onEnterPress={handleLogin}>
              {(focused, { ref }) => (
                <Button
                  ref={ref}
                  onClick={handleLogin}
                  fullWidth
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    bgcolor: "#f97316",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    textTransform: "none",
                    transition: "all 0.3s",
                    boxShadow: focused ? "0 10px 15px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(249, 115, 22, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      bgcolor: "#ea580c",  
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </Focusable>
          </Box>
        </Box>
      </Box>
    </FocusContext.Provider>
  );
}

export default React.memo(Login);