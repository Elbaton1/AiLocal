// src/components/Message.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import parse from "html-react-parser";

function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: "8px",
        }}
      >
        <Box
          sx={{
            backgroundColor: isUser ? "#4e9af1" : "#e0e0e0",
            color: isUser ? "#fff" : "#000",
            padding: "12px",
            borderRadius: "8px",
            maxWidth: "80%",
          }}
        >
          <Typography variant="body1">{parse(text)}</Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Message;
