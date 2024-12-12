const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const moment = require("moment");
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

// Helper function to save base64 images and replace with file URLs
const saveImages = (htmlContent) => {
  const imageFolder = path.join(__dirname, "../uploads");
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }

  const regex = /<img src="data:image\/([^;]+);base64,([^"]+)"/g;

  // Replace all base64 images with saved URLs
  return htmlContent.replace(regex, (match, extension, base64Data) => {
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}.${extension}`;
    const filePath = path.join(imageFolder, fileName);

    // Save the image to the file system
    fs.writeFileSync(filePath, buffer);

    // Return the updated image URL
    const imageUrl = `uploads/${fileName}`;
    return `<img src="${imageUrl}"`;
  });
};
// Schedule job to run every minute
cron.schedule('0,30 * * * *', () => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss'); // Current time
  console.log(`[CRON JOB STARTED]: Checking posts for scheduleDate ${now}`);
  // SQL query to get posts where the scheduleDate matches current time
  const query = "SELECT * FROM posts WHERE scheduleDate = ? AND blog_type = 'draft'";
  console.log(query,now)
  db.query(query, [now], (err, posts) => {
    if (err) {
      console.error("Error checking scheduled posts:", err);
      return;
    }

    posts.forEach((post) => {
      // Publish the post, change the status or blog_type to 'published'
      const publishQuery = "UPDATE posts SET blog_type = 'published' WHERE id = ?";
      console.log(publishQuery);
      db.query(publishQuery, [post.id], (err) => {
        if (err) {
          console.error("Error publishing post:", err);
        } else {
          console.log(`Post ${post.id} published successfully`);
        }
      });
    });
  });
});
// Create a new post
exports.createPost = (req, res) => {
  const {
    title,
    content: rawContent,
    blogType,
    category,
    tags,
    author,
    seoTitle,
    seoDescription,
    Custom_url,
    scheduleDate,
  } = req.body;

  // If scheduleDate is 'null' (string), set it to actual null
  const processedScheduleDate = scheduleDate === 'null' ? null : scheduleDate;

  const featuredImage = req.file ? `uploads/${req.file.filename}` : null;

  try {
    // Process content to save images and replace base64
    const content = saveImages(rawContent);

    // Prepare query to exclude scheduleDate if not provided
    let query = `
      INSERT INTO posts 
      (title, content, featured_image, blog_type, author_id, category_id, tags, seoTitle, seoDescription, Custom_url${processedScheduleDate ? ', scheduleDate' : ''}) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?${processedScheduleDate ? ', ?' : ''})
    `;
    
    // Prepare query parameters, only include scheduleDate if it's provided
    const queryParams = [
      title,
      content,
      featuredImage,
      blogType,
      author,
      category ? JSON.stringify(category) : null,
      tags ? JSON.stringify(tags) : null,
      seoTitle,
      seoDescription,
      Custom_url,
      ...(processedScheduleDate ? [processedScheduleDate] : []),  // Conditionally include scheduleDate
    ];

    db.query(query, queryParams, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error saving post", details: err });
      }

      res.status(201).json({
        message: "Post created successfully",
        postId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error processing post content:", error);
    res.status(500).json({ error: "Error processing post content" });
  }
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
      posts.Custom_url,
      authors.full_name AS author_name,
      COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
    GROUP BY posts.id
    ORDER BY posts.created_at DESC;
  `;
  db.query(query, (err, results) => {
    if (err) return handleError(res, err, "Error fetching posts");
    sendResponse(res, 200, "Posts retrieved successfully", results);
  });
};

// Fetch a single post by ID
exports.getPostData = (req, res) => {
  // Ensure the rawId is the full string from the URL (e.g., 'beginner-friendly-diy-home-improvement-project')
  const rawId = req.params.id_or_slug.replace(/-/g, " "); // Remove hyphens from the URL ID

  // Increment the view count
  const incrementViewQuery = `
    UPDATE posts SET view_count = view_count + 1 WHERE Custom_url = ?
  `;

  db.query(incrementViewQuery, [rawId], (err) => {
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
      WHERE posts.Custom_url = ?
      GROUP BY posts.id
    `;

    db.query(query, [rawId], (fetchErr, results) => {
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

  // SQL Query to fetch the post data by ID
  const query = "SELECT * FROM posts WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) return handleError(res, err, "Error fetching post data");
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const postData = results[0];
    // Replace relative image paths in content with absolute URLs
    postData.content = postData.content.replace(
      /<img src="\/uploads\/([^"]+)"/g,
      (match, fileName) => {
        return `<img src="${baseURL}/uploads/${fileName}"`;
      }
    );

    // Send the fetched post data as a response
    sendResponse(res, 200, "Post data retrieved successfully", postData);
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
    Custom_url,
    scheduleDate,
  } = req.body;
  // If scheduleDate is 'null' (string), set it to actual null
  const processedScheduleDate = scheduleDate === 'null' ? null : scheduleDate;
  console.log(scheduleDate);
  const newImagePath = req.file ? `uploads/${req.file.filename}` : null;

  const saveImages = (htmlContent) => {
    const imageFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder, { recursive: true });
    }

    const regex = /<img src="data:image\/([^;]+);base64,([^"]+)"/g;

    htmlContent = htmlContent.replace(regex, (match, extension, base64Data) => {
      try {
        const buffer = Buffer.from(base64Data, "base64");
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}.${extension}`;
        const filePath = path.join(imageFolder, fileName);

        fs.writeFileSync(filePath, buffer);

        const imageUrl = `/uploads/${fileName}`;
        return `<img src="${imageUrl}"`;
      } catch (error) {
        console.error("Error saving image:", error);
        return match;
      }
    });

    return htmlContent;
  };

  try {
    // Process content to replace base64 images
    const processedContent = saveImages(content);
    
    // Prepare query to conditionally include scheduleDate
    let query = `
      UPDATE posts 
      SET title = ?, content = ?, blog_type = ?, author_id = ?, category_id = ?, tags = ?, seoTitle = ?, seoDescription = ?, Custom_url = ?${processedScheduleDate ? ', scheduleDate = ?' : ''}
    `;
    
    const queryParams = [
      title,
      processedContent,
      blogType,
      author,
      category ? JSON.stringify(category) : null,
      tags ? JSON.stringify(tags) : null,
      seoTitle,
      seoDescription,
      Custom_url,
      ...(processedScheduleDate ? [processedScheduleDate] : []),  // Conditionally include scheduleDate
    ];

    if (newImagePath) {
      query += `, featured_image = ?`;
      queryParams.push(newImagePath);
    }

    query += ` WHERE id = ?`;
    queryParams.push(id);

    db.query(query, queryParams, (err, result) => {
      if (err) return handleError(res, err, "Error updating post");
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      sendResponse(res, 200, "Post updated successfully");
    });
  } catch (error) {
    console.error("Error processing post content:", error);
    res.status(500).json({ error: "Error processing post content" });
  }
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
      posts.blog_type,
      posts.seoDescription,
      posts.Custom_url
    FROM posts
    ORDER BY view_count DESC;`;

    const editorsChoiceQuery = `SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.blog_type,
      posts.featured_image,
      posts.seoDescription,
      posts.Custom_url,
      authors.full_name AS author_name
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    WHERE posts.view_count >= 10
    ORDER BY posts.view_count DESC;`;

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
