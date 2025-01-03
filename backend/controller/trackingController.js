const db = require("../config/db");

exports.trackPage = (req, res) => {
  const { page } = req.body;
  const userId = req.userId;
  const pageColumns = {
    home: "home_page_views",
    category: "category_page_views",
    blogs: "blogs_page_views",
  };

  const column = pageColumns[page];

  if (!column) {
    return res.status(400).json({ message: "Invalid page" });
  }

  db.query(
    `UPDATE user_tracking SET ${column} = ${column} + 1 WHERE user_id = ?`,
    [userId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Page view updated" });
    }
  );
};
