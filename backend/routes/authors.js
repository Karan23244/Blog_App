const express = require("express");
const router = express.Router();
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

// Define routes
router.get("/", getAllAuthors);
router.post("/", addAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;


