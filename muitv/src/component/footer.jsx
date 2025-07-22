import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        color: "#ffffff", 
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", 
        textAlign: "center",
        py: 2, 
        fontSize: "1.125rem",
        fontWeight: 500,
        width: "100%", 
        maxWidth: "100vw",
        margin: 0, }}
    >
      <Typography
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#f97316",
            transform: "scale(1.05)",
          },
        }}
      >
        © 2025 Country & User App. All rights reserved.
      </Typography>
    </Box>
  );
}

export default React.memo(Footer);
