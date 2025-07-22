import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../redux/cartSlice";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(0,0,0)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Shoppp
          </Typography>
        </Link>

        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={totalCartItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button
              color="inherit"
              onClick={logout}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgb(0,0,0)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            <Button
              color="inherit"
              sx={{
                color: "white",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
