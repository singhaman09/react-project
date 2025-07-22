import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api";
import { Product } from "../types";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Our Products
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1.5 }}>
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
                md: "33.333%",
                lg: "25%",
              },
              px: 1.5,
              mb: 3,
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ProductList;
