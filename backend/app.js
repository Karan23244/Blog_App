const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories.js");
const authorRoutes = require("./routes/authors");
const postRoutes = require("./routes/posts");
const categoryDataRoutes = require("./routes/categoryData");
const subscribeRoutes = require("./routes/subscriber");
const trackingRoutes = require("./routes/trackingRoutes.js");

const app = express();

app.use(express.json());

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://homimprovement.com",
    ];

    // Allow requests from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Define routes
app.use("/api/adminlogin", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categoryData", categoryDataRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/track-page", trackingRoutes); // Attach tracking routes

module.exports = app;
