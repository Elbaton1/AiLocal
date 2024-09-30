// src/components/UserInput.jsx
import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function UserInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex" }}>
      <TextField
        placeholder="Type your message..."
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton color="primary" type="submit">
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default UserInput;
