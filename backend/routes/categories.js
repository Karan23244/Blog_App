const express = require("express");
const { getAllCategories, addCategory,updateCategory,deleteCategory } = require("../controller/categoryController");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Add update and delete routes...

module.exports = router;
