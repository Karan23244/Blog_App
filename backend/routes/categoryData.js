const express = require("express");
const {getPostsByCategory } = require("../controller/categoryDataController");
const router = express.Router();

router.get("/:param1/:param2", getPostsByCategory);

module.exports = router;
