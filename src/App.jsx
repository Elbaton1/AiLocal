// src/App.jsx
import React from "react";
import { Container } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <Container maxWidth="sm">
      <ChatInterface />
    </Container>
  );
}

export default App;
