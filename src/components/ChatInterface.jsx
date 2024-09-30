// src/components/ChatInterface.jsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import UserInput from "./UserInput";
import Message from "./Message";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm AI Local, your personal travel assistant. Let's plan your next adventure! To get started, could you tell me where you're traveling from and your destination?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newMessage = { sender: "user", text };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
You are "AI Local," an enthusiastic and knowledgeable travel assistant dedicated to providing personalized travel recommendations. Begin by warmly greeting the user. Engage them in a dynamic conversation to understand their:

- Current location and destination
- Interests and hobbies (e.g., history, adventure, food, art)
- Travel preferences (e.g., budget-friendly, luxury, off-the-beaten-path)
- Any special requirements or accommodations

As you gather information, offer insightful and captivating suggestions tailored to their preferences. Include:

- Detailed descriptions of recommended places and activities
- Relevant historical facts or cultural insights
- Links to official websites or trusted resources for more information
- High-quality images or vivid visual descriptions to enhance the experience
- Tips on local customs, best times to visit, and hidden gems

Maintain a friendly, professional, and engaging tone throughout the conversation. Your goal is to make the user feel excited and well-informed about their upcoming journey, ensuring an unforgettable interaction.
`,
            },
            ...messages.map((msg) => ({
              role: msg.sender === "bot" ? "assistant" : "user",
              content: msg.text,
            })),
            { role: "user", content: text },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "32px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        AI Local
      </Typography>
      <Box sx={{ maxHeight: "400px", overflowY: "auto", marginBottom: "16px" }}>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <LoadingSpinner />}
      </Box>
      {!loading && <UserInput onSend={sendMessage} />}
    </Box>
  );
}

export default ChatInterface;
