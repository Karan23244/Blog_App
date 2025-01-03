const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

const cookieMiddleware = (req, res, next) => {
  let userId = req.cookies?.userId;

  if (!userId) {
    const newUserId = uuidv4();
    res.cookie("userId", newUserId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });

    const userAgent = req.headers["user-agent"] || "Unknown";
    db.query(
      "INSERT INTO user_tracking (user_id, user_agent) VALUES (?, ?)",
      [newUserId, userAgent],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err);
        }
      }
    );

    userId = newUserId;
  }
  
  req.userId = userId; // Attach userId to request object
  next();
};

module.exports = cookieMiddleware;
