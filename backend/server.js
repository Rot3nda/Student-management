const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON in request body

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Student routes
app.use("/api", require("./routes/studentRoutes"));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
