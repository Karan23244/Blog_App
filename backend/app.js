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
const commentRoutes = require("./routes/comments");
const db = require("./config/db.js");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
app.use(express.json());

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://homimprovement.com",
      "https://www.homimprovement.com",
      "https://admin.homimprovement.com/",
      "https://steptosale.com/",
      "http://127.0.0.1:5501",
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
app.use("/api/category", categoryDataRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/track-page", trackingRoutes);
app.use("/api/comments", commentRoutes);

app.get("/resolve-affiliate", async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "Missing affiliate URL" });

  console.log("Fetching URL:", url);

  try {
    const response = await fetch(url, { redirect: "follow" });
    console.log("Resolved to:", response.url);
    res.json({ finalURL: response.url });
  } catch (err) {
    console.error("Fetch error:", err);
    res
      .status(500)
      .json({ error: "Failed to resolve redirect.", details: err.message });
  }
});
module.exports = app;
