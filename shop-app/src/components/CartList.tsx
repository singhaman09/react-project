import React from "react";
import { Typography, Button, Box, Divider, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/cartSlice";
import CartItem from "./CartItem";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const CartList: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <ShoppingCartIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgb(0,0,0)",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </Typography>

        <Button variant="outlined" color="error" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Box>

        <Paper
          sx={{
            p: 2,
            width: { xs: "100%", md: 288 },
            height: "fit-content",
            position: "sticky",
            top: 16,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Subtotal:</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Shipping:</Typography>
            <Typography>Free</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "rgb(0,0,0)",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            Checkout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CartList;
