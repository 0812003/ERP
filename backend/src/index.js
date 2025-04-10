import express from "express";
import axios from "axios";  // Import axios
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());  // To parse JSON request bodies
app.use(cors()); 

// Define the chatbot route in your Node.js backend
app.post("/api/chatbot", async (req, res) => {
  const message = req.body.message;  // The message from the frontend

  try {
    // Make a request to the Python Flask backend
    const response = await axios.post("http://127.0.0.1:5000/api", {
      message: message,
    });

    // Send the Python server's response back to the frontend
    res.json({ response: response.data.response });
  } catch (error) {
    console.error("Error connecting to Python server:", error);
    res.status(500).json({ response: "Error connecting to the Python server." });
  }
});

app.listen(port, () => {
  console.log(`Node.js server is running on port ${port}`);
});
