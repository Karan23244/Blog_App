const express = require("express");
const {getPostsByCategory } = require("../controller/categoryDataController");
const router = express.Router();

router.get("/:param0/:param1", getPostsByCategory);

module.exports = router;
