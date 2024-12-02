const app = require("./app");
const express = require("express");
require("dotenv").config();

// Serve static files (images)
app.use("/uploads", express.static("uploads"));
// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, welcome to the homepage!"); // Content to display
});
const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
