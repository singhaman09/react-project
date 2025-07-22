import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  RootState,
} from "../redux/cartSlice";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        "&:hover": {
          boxShadow: 3,
          transform: "scale(1.03)",
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          padding: 2,
          height: 250,
          objectFit: "contain",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            mb: 1,
            height: "3.5em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={product.rating.rate} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating.count})
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2, color: "black" }}
        >
          ${product.price.toFixed(2)}
        </Typography>

        {quantity === 0 ? (
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "rgb(0,0,0)",
              "&:hover": {
                backgroundColor: "black",
                transform: "scale(1.01)",
              },
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDecreaseQuantity}
              size="small"
            >
              -
            </Button>

            <Typography sx={{ mx: 1, fontWeight: "bold" }}>
              {quantity}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleIncreaseQuantity}
              size="small"
            >
              +
            </Button>

            {quantity > 0 && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => dispatch(removeFromCart(product.id))}
                sx={{ ml: 1 }}
              >
                Remove
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
