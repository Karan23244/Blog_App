const db = require("../config/db");

// Helper function for sending responses
const sendResponse = (res, statusCode, message, data = null) => {
  const response = { message };
  if (data) response.data = data;
  res.status(statusCode).json(response);
};

// Helper function to log and send errors
const handleError = (res, err, message = "Server Error") => {
  console.error(message, err);
  res.status(500).json({ message });
};

// Create a new post
exports.createPost = (req, res) => {
  const {
    title,
    content,
    blogType,
    category,
    tags,
    author,
    seoTitle,
    seoDescription,
  } = req.body;
  const featuredImage = req.file ? req.file.path : null;

  const categoryIdsJson = category ? JSON.stringify(category) : null;
  const tagsJson = tags ? JSON.stringify(tags) : null;
  const query = `
    INSERT INTO posts 
    (title, content, featured_image, blog_type, author_id, category_id, tags, seoTitle, seoDescription) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const queryParams = [
    title,
    content,
    featuredImage,
    blogType,
    author,
    categoryIdsJson,
    tagsJson,
    seoTitle,
    seoDescription,
  ];

  db.query(query, queryParams, (err, result) => {
    if (err) return handleError(res, err, "Error saving post");
    sendResponse(res, 201, "Post created successfully", {
      postId: result.insertId,
    });
  });
};

// Fetch all posts
exports.getAllPosts = (req, res) => {
  
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.featured_image,
      posts.tags,
      posts.blog_type,
      posts.seoTitle,
      posts.seoDescription,
      posts.created_at,
      authors.full_name AS author_name,
      COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
    GROUP BY posts.id
    ORDER BY posts.created_at DESC
    LIMIT 7;
  `;
  db.query(query, (err, results) => {
    if (err) return handleError(res, err, "Error fetching posts");
    sendResponse(res, 200, "Posts retrieved successfully", results);
  });
};

// Fetch a single post by ID
exports.getPostData = (req, res) => {
  // Ensure the ID is numeric
  const rawId = req.params.id.split("-")[0];
  const postId = parseInt(rawId, 10);
  if (isNaN(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const incrementViewQuery = `
    UPDATE posts SET view_count = view_count + 1 WHERE id = ?
  `;

  // Increment the view count
  db.query(incrementViewQuery, [postId], (err) => {
    if (err) {
      return handleError(res, err, "Error incrementing view count");
    }

    // Fetch the post data
    const query = `
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.featured_image,
        posts.blog_type,
        posts.tags,
        posts.seoTitle,
        posts.seoDescription,
        posts.created_at,
        authors.full_name AS author_name,
        COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names
      FROM posts
      LEFT JOIN authors ON posts.author_id = authors.author_id
      LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
      WHERE posts.id = ?
      GROUP BY posts.id
    `;

    db.query(query, [postId], (fetchErr, results) => {
      if (fetchErr) {
        return handleError(res, fetchErr, "Error fetching post");
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        message: "Post retrieved successfully",
        data: results[0],
      });
    });
  });
};

// Fetch a post for editing
exports.getEditPostData = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM posts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return handleError(res, err, "Error fetching post data");
    if (results.length === 0)
      return res.status(404).json({ message: "Post not found" });
    sendResponse(res, 200, "Post data retrieved successfully", results[0]);
  });
};
// Update a post
exports.updatePost = (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    blogType,
    category,
    tags,
    author,
    seoTitle,
    seoDescription,
  } = req.body;
  const newImagePath = req.file ? req.file.path : null;

  const categoryIdsJson = category ? JSON.stringify(category) : null;
  const tagsJson = tags ? JSON.stringify(tags) : null;

  let query = `
    UPDATE posts 
    SET title = ?, content = ?, blog_type = ?, author_id = ?, category_id = ?, tags = ?, seoTitle = ?, seoDescription = ?
  `;
  const queryParams = [
    title,
    content,
    blogType,
    author,
    categoryIdsJson,
    tagsJson,
    seoTitle,
    seoDescription,
  ];

  if (newImagePath) {
    query += `, featured_image = ?`;
    queryParams.push(newImagePath);
  }

  query += ` WHERE id = ?`;
  queryParams.push(id);

  db.query(query, queryParams, (err, result) => {
    if (err) return handleError(res, err, "Error updating post");
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Post not found" });
    sendResponse(res, 200, "Post updated successfully");
  });
};

// Delete a post
exports.deletePost = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM posts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return handleError(res, err, "Error deleting post");
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Post not found" });
    sendResponse(res, 200, "Post successfully deleted");
  });
};

// Fetch Top Reads and Editorial Choice
/**
 * Get Top Reads and Editor's Choice blogs
 */
exports.getTopReadsAndEditorsChoice = async (req, res) => {
  try {
    const topReadsQuery = `SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.featured_image,
      posts.seoDescription
    FROM posts
    ORDER BY view_count DESC
    LIMIT 6;`;

    const editorsChoiceQuery = `SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.featured_image,
      posts.seoDescription,
      authors.full_name AS author_name
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    WHERE posts.view_count >= 10
    ORDER BY posts.view_count DESC
    LIMIT 12;`;

    // Execute both queries
    const [topReads, editorsChoice] = await Promise.all([
      new Promise((resolve, reject) =>
        db.query(topReadsQuery, (err, results) => {
          if (err) {
            console.error("Error in topReads query:", err);
            reject(err);
          } else {
            resolve(results);
          }
        })
      ),
      new Promise((resolve, reject) =>
        db.query(editorsChoiceQuery, (err, results) => {
          if (err) {
            console.error("Error in editorsChoice query:", err);
            reject(err);
          } else {
            resolve(results);
          }
        })
      ),
    ]);

    // Send response
    sendResponse(
      res,
      200,
      "Top Reads and Editor's Choice blogs retrieved successfully",
      { topReads, editorsChoice }
    );
  } catch (err) {
    console.error("Error in getTopReadsAndEditorsChoice:", err);
    handleError(res, err, "Error fetching Top Reads and Editor's Choice");
  }
};





