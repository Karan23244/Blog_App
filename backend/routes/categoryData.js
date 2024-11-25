const express = require("express");
const {getPostsByCategory } = require("../controller/categoryDataController");
const router = express.Router();

router.get("/", getPostsByCategory);

module.exports = router;
