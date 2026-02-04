const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/**
 * CORS (for Vercel + local dev)
 * Put this BEFORE routes
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://student-management-frontend-jlclcve7-rot3ndas-projects.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman/curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handle preflight (Safari can be picky)
app.options("*", cors());

// Middleware
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
