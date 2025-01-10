const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

// Middleware that runs only on specific routes
const cookieMiddleware = (req, res, next) => {

  let userId = req.cookies?.userId;
  console.log(userId, "cookie userId");

  if (!userId) {
    const newUserId = uuidv4();
    const userAgent = req.headers["user-agent"] || "Unknown";

    // Check if the new userId already exists in the database
    db.query(
      "SELECT * FROM user_tracking WHERE user_id = ?",
      [newUserId],
      (err, results) => {
        if (err) {
          console.error("Database error while checking user existence:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
          // Insert new user if not found
          db.query(
            "INSERT INTO user_tracking (user_id, user_agent) VALUES (?, ?)",
            [newUserId, userAgent],
            (insertErr) => {
              if (insertErr) {
                console.error("Error inserting new user:", insertErr);
                return res.status(500).json({ message: "Internal server error" });
              }
            }
          );

          res.cookie("userId", newUserId, {
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
          });
          req.userId = newUserId; // Attach userId to the request
        } else {
          req.userId = results[0].user_id; // Assign existing userId
        }

        next(); // Proceed to the next middleware
      }
    );
  } else {
    req.userId = userId; // Attach userId from cookie to the request
    next();
  }
};

module.exports = cookieMiddleware;
