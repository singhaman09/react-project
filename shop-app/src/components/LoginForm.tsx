import React, { useState } from "react";
import { Paper, TextField, Button, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      await login({ username, password });
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        Login to Smart Shop
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Hint: use 'user'"
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hint: use 'password'"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={loading}
          sx={{
            mt: 3,
            backgroundColor: "rgb(0,0,0)",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
