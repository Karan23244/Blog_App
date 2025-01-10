const db = require("../config/db");

exports.trackPage = (req, res) => {
  const { page } = req.body;
  const userId = req.userId;
  const userAgent = req.headers["user-agent"];

  const pageColumns = {
    home: "home_page_views",
    category: "category_page_views",
    blogs: "blogs_page_views",
  };

  const column = pageColumns[page];

  if (!column) {
    return res.status(400).json({ message: "Invalid page" });
  }

  // Check if user exists before updating the page views
  db.query("SELECT * FROM user_tracking WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      // Insert new record for the user
      db.query(
        "INSERT INTO user_tracking (user_id, user_agent, home_page_views, category_page_views, blogs_page_views) VALUES (?, ?, 0, 0, 0)",
        [userId, userAgent],
        (insertErr) => {
          if (insertErr) {
            console.error("Error inserting new user:", insertErr);
            return res.status(500).json({ message: "Internal server error" });
          }

          // Update the page view count for the inserted user
          db.query(
            `UPDATE user_tracking SET ${column} = ${column} + 1 WHERE user_id = ?`,
            [userId],
            (updateErr) => {
              if (updateErr) {
                console.error("Error updating page views:", updateErr);
                return res.status(500).json({ message: "Internal server error" });
              }

              res.status(201).json({ message: "User added and page view updated" });
            }
          );
        }
      );
    } else {
      // Update the page view count for existing user
      db.query(
        `UPDATE user_tracking SET ${column} = ${column} + 1 WHERE user_id = ?`,
        [userId],
        (updateErr) => {
          if (updateErr) {
            console.error("Error updating page views:", updateErr);
            return res.status(500).json({ message: "Internal server error" });
          }

          res.status(200).json({ message: "Page view updated" });
        }
      );
    }
  });
};
