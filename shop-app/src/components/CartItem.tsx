import React from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem as CartItemType } from "../types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { product, quantity } = item;

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        p: 2,
        mb: 2,
        boxShadow: 1,
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          width: 96,
          height: 96,
          objectFit: "contain",
          mr: 2,
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ${product.price.toFixed(2)} each
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => handleUpdateQuantity(quantity - 1)}
              size="small"
              sx={{ border: "1px solid", borderColor: "grey.300" }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography sx={{ mx: 1, fontWeight: "bold" }}>
              {quantity}
            </Typography>

            <IconButton
              onClick={() => handleUpdateQuantity(quantity + 1)}
              size="small"
              sx={{ border: "1px solid", borderColor: "grey.300" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 2 }}>
              ${(product.price * quantity).toFixed(2)}
            </Typography>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveFromCart}
              size="small"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItem;
