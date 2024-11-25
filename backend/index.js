const app = require("./app");
const multer = require('multer');
const path = require('path');
const express = require('express');
require('dotenv').config();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files (images)
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});


