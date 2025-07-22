import React from "react";
import { Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container
        sx={{
          px: 2,
          py: 4,
          flexGrow: 1,
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
