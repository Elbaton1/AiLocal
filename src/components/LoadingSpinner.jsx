// src/components/LoadingSpinner.jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" marginY="16px">
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
