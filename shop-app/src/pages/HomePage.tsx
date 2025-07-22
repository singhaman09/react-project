import React from "react";
import { Box, Container } from "@mui/material";
import ProductList from "../components/ProductList";
import Header from "../components/Header";

const HomePage: React.FC = () => {
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
        <ProductList />
      </Container>
    </Box>
  );
};

export default HomePage;
