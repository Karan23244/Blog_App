const express = require("express");
const router = express.Router();
const { addComment, allComments } = require("../controller/commentController");

router.post("/", addComment);      // ✅ Add Comment
router.get("/:post_id", allComments); // ✅ Get Comments (Changed to GET)

module.exports = router;
