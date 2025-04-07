const db = require("../config/db");

// 📌 Add a Comment
exports.addComment = (req, res) => {
  const { post_id, name, comment } = req.body;

  if (!post_id || !name || !comment) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const sql =
      "INSERT INTO comments (post_id, name, comment) VALUES (?, ?, ?)";
    db.query(sql, [post_id, name, comment]); // ✅ Await added

    res.status(201).json({ message: "Comment added successfully!" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// 📌 Get Comments for a Specific Post
exports.allComments = (req, res) => {
  const { post_id } = req.params;

  const sql =
    "SELECT name, comment, created_at FROM comments WHERE post_id = ? ORDER BY created_at DESC";

  db.query(sql, [post_id], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res
        .status(500)
        .json({ message: "Server error. Try again later." });
    }
    res.status(200).json(results);
  });
};
