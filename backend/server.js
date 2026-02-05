const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://student-management-frontend-jlclcve7-rot3ndas-projects.vercel.app",
  process.env.CLIENT_URL, // Render frontend (optional)
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.options("*", cors());

/* ================= Middleware ================= */
app.use(express.json());

/* ================= Routes ================= */
app.get("/", (req, res) => res.send("API is running..."));
app.get("/api/health", (req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV })
);

app.use("/api", require("./routes/studentRoutes"));

/* ================= Error Handling ================= */
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

/* ================= Start Server ================= */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
