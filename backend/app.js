const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories.js");
const authorRoutes = require("./routes/authors");
const postRoutes = require("./routes/posts");
const categoryDataRoutes = require("./routes/categoryData");
const subscribeRoutes = require('./routes/subscriber');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/adminlogin", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categoryData", categoryDataRoutes);
app.use("/api/subscribe", subscribeRoutes);


module.exports = app;


