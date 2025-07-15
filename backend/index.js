const app = require("./app");
const path = require("path");
const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
// Serve static files (images)
const staticPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticPath));
console.log("Static files served from:", staticPath);

// Serve sitemap.xml from frontend's public folder
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join("../frontend/public", "sitemap.xml"));
});
const staticPath1 = path.join("../../", "sitemap.xml");
console.log("Static files served from:", staticPath1);

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

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
