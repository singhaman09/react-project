import React from "react";
import { Box, Container } from "@mui/material";
import CartList from "../components/CartList";
import Header from "../components/Header";

const CartPage: React.FC = () => {
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
        <CartList />
      </Container>
    </Box>
  );
};

export default CartPage;
