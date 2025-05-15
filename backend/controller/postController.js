const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const moment = require("moment");
const { parseStringPromise } = require("xml2js");
const { log } = require("console");
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
cron.schedule("0,30 * * * *", () => {
  const now = moment().format("YYYY-MM-DD HH:mm:ss"); // Current time
  // SQL query to get posts where the scheduleDate matches current time
  const query =
    "SELECT * FROM posts WHERE scheduleDate = ? AND blog_type = 'draft'";
  db.query(query, [now], (err, posts) => {
    if (err) {
      console.error("Error checking scheduled posts:", err);
      return;
    }

    posts.forEach((post) => {
      // Publish the post, change the status or blog_type to 'published'
      const publishQuery =
        "UPDATE posts SET blog_type = 'published' WHERE id = ?";
      db.query(publishQuery, [post.id], (err) => {
        if (err) {
          console.error("Error publishing post:", err);
        } else {
        }
      });
    });
  });
});
//Dynamic Sitemap
const baseUrl = "https://homimprovement.com";
const sitemapPath = path.join(__dirname, "../../frontend/public/sitemap.xml");
// Creating Dynamic Sitemap
// const generateSitemap = async () => {
//   const query = `
//     SELECT posts.Custom_url, posts.created_at, categories.category_name
//     FROM posts
//     JOIN categories
//     ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
//     WHERE posts.blog_type = 'published'
//   `;

//   db.query(query, async (err, results) => {
//     if (err) {
//       console.error("Error fetching posts for sitemap:", err);
//       return;
//     }

//     let existingUrls = [];

//     // Read the existing sitemap.xml if it exists
//     if (fs.existsSync(sitemapPath)) {
//       try {
//         const existingData = fs.readFileSync(sitemapPath, "utf-8");
//         const parsedData = await parseStringPromise(existingData);

//         if (parsedData.urlset.url) {
//           existingUrls = parsedData.urlset.url.map((urlObj) => ({
//             loc: urlObj.loc[0],
//             lastmod: urlObj.lastmod
//               ? urlObj.lastmod[0]
//               : new Date().toISOString(),
//             changefreq: urlObj.changefreq ? urlObj.changefreq[0] : "weekly",
//             priority: urlObj.priority ? urlObj.priority[0] : "0.5",
//           }));
//         }
//       } catch (error) {
//         console.error("Error reading existing sitemap:", error);
//       }
//     }

//     // Generate new dynamic URLs from database
//     const newUrls = results.map((post) => {
//       const categorySlug = post.category_name
//         .toLowerCase()
//         .replace(/\s+/g, "-");
//       const urlSlug = post.Custom_url.toLowerCase().replace(/\s+/g, "-");
//       return {
//         loc: `${baseUrl}/${categorySlug}/${urlSlug}`,
//         lastmod: new Date(post.created_at).toISOString(),
//         changefreq: "weekly",
//         priority: "0.5",
//       };
//     });

//     // Separate static URLs from dynamic ones
//     const staticUrls = existingUrls.filter(
//       (url) => !url.loc.startsWith(baseUrl + "/")
//     );

//     // Merge dynamic URLs: update existing ones and remove outdated ones
//     const finalDynamicUrls = existingUrls
//       .filter((existing) =>
//         newUrls.some((newUrl) => newUrl.loc === existing.loc)
//       ) // Keep existing if still valid
//       .map(
//         (existing) =>
//           newUrls.find((newUrl) => newUrl.loc === existing.loc) || existing
//       ); // Update properties if needed

//     // Add new URLs that don’t exist in the file yet
//     newUrls.forEach((newUrl) => {
//       if (!finalDynamicUrls.some((existing) => existing.loc === newUrl.loc)) {
//         finalDynamicUrls.push(newUrl);
//       }
//     });

//     // Final list: Combine static and dynamic URLs
//     const finalUrls = [...staticUrls, ...finalDynamicUrls];

//     // Generate updated XML content
//     let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//     sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//     finalUrls.forEach((url) => {
//       sitemapContent += `  <url>\n`;
//       sitemapContent += `    <loc>${url.loc}</loc>\n`;
//       sitemapContent += `    <lastmod>${url.lastmod}</lastmod>\n`;
//       sitemapContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
//       sitemapContent += `    <priority>${url.priority}</priority>\n`;
//       sitemapContent += `  </url>\n`;
//     });

//     sitemapContent += `</urlset>`;

//     // Write updated sitemap.xml file
//     fs.writeFileSync(sitemapPath, sitemapContent);
//     console.log("Sitemap updated successfully!");
//   });
// };

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
    ad_url,
  } = req.body;
  // If scheduleDate is 'null' (string), set it to actual null
  const processedScheduleDate = scheduleDate === "null" ? null : scheduleDate;
  const featuredImage = req.files?.featuredImage
    ? `uploads/${req.files.featuredImage[0].filename}`
    : null;
  const AdImage = req.files?.AdImage
    ? `uploads/${req.files.AdImage[0].filename}`
    : null;

  try {
    // Process content to save images and replace base64
    const content = saveImages(rawContent);

    let query = `
      INSERT INTO posts 
      (title, content, featured_image, AdImage, blog_type, author_id, category_id, tags, seoTitle, seoDescription, ad_url, Custom_url${
        processedScheduleDate ? ", scheduleDate" : ""
      }) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?${
        processedScheduleDate ? ", ?" : ""
      })
    `;
    const queryParams = [
      title,
      content,
      featuredImage,
      AdImage,
      blogType,
      author,
      category ? JSON.stringify(category) : null,
      tags ? JSON.stringify(tags) : null,
      seoTitle,
      seoDescription,
      ad_url,
      Custom_url,
      ...(processedScheduleDate ? [processedScheduleDate] : []),
    ];

    db.query(query, queryParams, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error saving post", details: err });
      }
      // generateSitemap(); // Update sitemap after new post
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
// exports.getPostData = (req, res) => {
//   const rawId = req.params.param2.replace(/-/g, " "); // Remove hyphens from the URL ID
//   const userId = req.cookies.userId || null; // Set userId to null if not provided

//   // Fetch the post ID from the 'posts' table using the rawId (Custom_url)
//   const fetchPostIdQuery = `
//     SELECT id FROM posts WHERE Custom_url = ?
//   `;

//   db.query(fetchPostIdQuery, [rawId], (fetchErr, fetchResults) => {
//     if (fetchErr) {
//       return handleError(res, fetchErr, "Error fetching post ID");
//     }

//     if (fetchResults.length === 0) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const postId = fetchResults[0].id;
//     const today = new Date().toISOString().slice(0, 10); // Get current date (YYYY-MM-DD)

//     const updateViewCountQuery = `
//       INSERT INTO post_views (post_id, view_date, views, user_id)
//       VALUES (?, ?, 1, ?)
//       ON DUPLICATE KEY UPDATE views = views + 1;
//     `;

//     db.query(updateViewCountQuery, [postId, today, userId], (updateErr) => {
//       if (updateErr) {
//         return handleError(res, updateErr, "Error incrementing view count");
//       }

//       const query = `
//         SELECT
//           posts.id,
//           posts.title,
//           posts.content,
//           posts.featured_image,
//           posts.blog_type,
//           posts.tags,
//           posts.seoTitle,
//           posts.seoDescription,
//           posts.scheduleDate,
//           posts.Custom_url,
//           posts.created_at,
//           posts.ad_url,
//           posts.AdImage,
//           authors.full_name AS author_name,
//           COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names
//         FROM posts
//         LEFT JOIN authors ON posts.author_id = authors.author_id
//         LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
//         WHERE posts.Custom_url = ?
//         GROUP BY posts.id
//       `;

//       db.query(query, [rawId], (fetchPostErr, results) => {
//         if (fetchPostErr) {
//           return handleError(res, fetchPostErr, "Error fetching post data");
//         }

//         if (results.length === 0) {
//           return res.status(404).json({ message: "Post not found" });
//         }

//         const baseURL = `${req.protocol}://${req.get("host")}`;
//         const postData = results[0];

//         postData.content = postData.content.replace(
//           /<img src="\/uploads\/([^"]+)"/g,
//           (match, fileName) => {
//             return `<img src="${baseURL}/uploads/${fileName}"`;
//           }
//         );

//         res.status(200).json({
//           message: "Post retrieved successfully",
//           data: postData,
//         });
//       });
//     });
//   });
// };
exports.getPostData = (req, res) => {
  const categoryParam = req.params.param1.replace(/-/g, " ").toLowerCase();
  const rawId = req.params.param2.replace(/-/g, " ");
  const userId = req.cookies.userId || null;

  console.log("categoryParam", categoryParam);

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
      posts.scheduleDate,
      posts.Custom_url,
      posts.created_at,
      posts.ad_url,
      posts.AdImage,
      authors.full_name AS author_name,
      COALESCE(JSON_ARRAYAGG(categories.category_name), JSON_ARRAY()) AS category_names
    FROM posts
    LEFT JOIN authors ON posts.author_id = authors.author_id
    LEFT JOIN categories ON FIND_IN_SET(categories.category_id, REPLACE(posts.category_id, '"', ''))
    WHERE posts.Custom_url = ?
    GROUP BY posts.id
  `;

  db.query(query, [rawId], (fetchPostErr, results) => {
    if (fetchPostErr) {
      return handleError(res, fetchPostErr, "Error fetching post data");
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postData = results[0];

    // 🔒 Safe category parsing
    let categoryList = [];

    if (Array.isArray(postData.category_names)) {
      categoryList = postData.category_names;
    } else {
      const rawCatNames = postData.category_names;

      try {
        const parsed = JSON.parse(rawCatNames);
        categoryList = Array.isArray(parsed)
          ? parsed
          : String(parsed)
              .split(",")
              .map((x) => x.trim());
      } catch (e) {
        categoryList = String(rawCatNames)
          .split(",")
          .map((x) => x.trim());
      }
    }

    categoryList = categoryList.map((name) => name.toLowerCase());
    console.log("categoryList", categoryList);

    if (!categoryList.includes(categoryParam)) {
      return res
        .status(404)
        .json({ message: "Category does not match the post" });
    }

    const today = new Date().toISOString().slice(0, 10);
    const updateViewCountQuery = `
      INSERT INTO post_views (post_id, view_date, views, user_id)
      VALUES (?, ?, 1, ?)
      ON DUPLICATE KEY UPDATE views = views + 1;
    `;

    db.query(
      updateViewCountQuery,
      [postData.id, today, userId],
      (updateErr) => {
        if (updateErr) {
          return handleError(res, updateErr, "Error incrementing view count");
        }

        const baseURL = `${req.protocol}://${req.get("host")}`;
        postData.content = postData.content.replace(
          /<img src="\/uploads\/([^"]+)"/g,
          (match, fileName) => `<img src="${baseURL}/uploads/${fileName}"`
        );

        res.status(200).json({
          message: "Post retrieved successfully",
          data: postData,
        });
      }
    );
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
    ad_url,
  } = req.body;
  const newImagePath = req.files?.featuredImage
    ? `uploads/${req.files.featuredImage[0].filename}`
    : null;
  const newAdImagePath = req.files?.AdImage
    ? `uploads/${req.files.AdImage[0].filename}`
    : null;

  // If scheduleDate is 'null' (string), set it to actual null
  const processedScheduleDate = scheduleDate === "null" ? null : scheduleDate;
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
      SET title = ?, content = ?, blog_type = ?, author_id = ?, category_id = ?, tags = ?, seoTitle = ?, seoDescription = ?, ad_url = ?, Custom_url = ?${
        processedScheduleDate ? ", scheduleDate = ?" : ""
      }
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
      ad_url,
      Custom_url,
      ...(processedScheduleDate ? [processedScheduleDate] : []),
    ];

    if (newImagePath) {
      query += `, featured_image = ?`;
      queryParams.push(newImagePath);
    }
    if (newAdImagePath) {
      query += `, AdImage = ?`;
      queryParams.push(newAdImagePath);
    }
    query += ` WHERE id = ?`;
    queryParams.push(id);
    // Execute query
    db.query(query, queryParams, (err, result) => {
      if (err) return handleError(res, err, "Error updating post");
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
      // generateSitemap(); // Update sitemap after editing post
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
    generateSitemap(); // Update sitemap after deleting post
    sendResponse(res, 200, "Post successfully deleted");
  });
};

// Fetch Top Reads and Editorial Choice
exports.getTopReadsAndEditorsChoice = (req, res) => {
  const topReadsQuery = `
  SELECT 
    p.id, 
    p.title, 
    p.content, 
    p.featured_image, 
    p.blog_type, 
    p.seoDescription, 
    p.Custom_url, 
    SUM(pv.views) AS total_views,
    COALESCE(
      (
        SELECT JSON_ARRAYAGG(category_name)
        FROM (
          SELECT DISTINCT c.category_name
          FROM categories c
          WHERE FIND_IN_SET(c.category_id, REPLACE(p.category_id, '"', ''))
        ) AS unique_categories
      ),
      JSON_ARRAY()
    ) AS category_names
  FROM posts p
  JOIN post_views pv ON p.id = pv.post_id
  WHERE pv.view_date >= CURDATE() - INTERVAL 7 DAY
  GROUP BY p.id
  ORDER BY total_views DESC;
`;

  const editorsChoiceQuery = `
  SELECT 
    p.id, 
    p.title, 
    p.content, 
    p.featured_image, 
    p.blog_type, 
    p.seoDescription, 
    p.Custom_url, 
    SUM(pv.views) AS total_views,
    COALESCE(
      (
        SELECT JSON_ARRAYAGG(category_name)
        FROM (
          SELECT DISTINCT c.category_name
          FROM categories c
          WHERE FIND_IN_SET(c.category_id, REPLACE(p.category_id, '"', ''))
        ) AS unique_categories
      ),
      JSON_ARRAY()
    ) AS category_names
  FROM posts p
  JOIN post_views pv ON p.id = pv.post_id
  LEFT JOIN categories c ON FIND_IN_SET(c.category_id, REPLACE(p.category_id, '"', ''))
  WHERE pv.view_date >= CURDATE() - INTERVAL 60 DAY
  GROUP BY p.id
  ORDER BY total_views DESC;
`;

  // First query: Top Reads
  db.query(topReadsQuery, (topReadsErr, topReadsResults) => {
    if (topReadsErr) {
      console.error("Error fetching Top Reads:", topReadsErr);
      return handleError(res, topReadsErr, "Error fetching Top Reads");
    }

    // Second query: Editor's Choice
    db.query(editorsChoiceQuery, (editorsChoiceErr, editorsChoiceResults) => {
      if (editorsChoiceErr) {
        console.error("Error fetching Editor's Choice:", editorsChoiceErr);
        return handleError(
          res,
          editorsChoiceErr,
          "Error fetching Editor's Choice"
        );
      }

      // Send response with separate results for Top Reads and Editor's Choice
      sendResponse(
        res,
        200,
        "Top Reads and Editor's Choice blogs retrieved successfully",
        { topReads: topReadsResults, editorsChoice: editorsChoiceResults }
      );
    });
  });
};

//related blogs

exports.relatedPosts = (req, res) => {
  const categoryName = req.params.category;
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
    WHERE categories.category_name = ?
    GROUP BY posts.id
    ORDER BY posts.created_at DESC
    LIMIT 4;
  `;

  db.query(query, [categoryName], (err, results) => {
    if (err) {
      console.error("❌ Error fetching related posts:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      console.warn("⚠️ No related posts found for category:", categoryName);
      return res.status(404).json({ error: "No related posts found" });
    }
    res.status(200).json({ data: results });
  });
};
