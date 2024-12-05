const db = require("../config/db");

// Utility function for executing queries
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Function to send consistent API responses
const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

// Fetch posts by category
exports.getPostsByCategory = (req, res) => {
  const { categoryId } = req.query;
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.featured_image,
      posts.blog_type,
      posts.seoTitle,
      posts.seoDescription,
      posts.created_at,
      posts.view_count,
      posts.Custom_url,
      authors.full_name AS author_name,
      COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names,
      COALESCE(JSON_ARRAYAGG(categories.category_type), JSON_ARRAY()) AS category_types
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
    WHERE FIND_IN_SET(?, REPLACE(posts.category_id, '"', ''))
    GROUP BY posts.id
    ORDER BY posts.created_at DESC;
  `;

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return sendResponse(
        res,
        500,
        "Error fetching posts by category",
        err.message
      );
    }
    sendResponse(res, 200, "Posts retrieved successfully", results);
  });
};

