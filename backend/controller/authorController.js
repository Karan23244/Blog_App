const db = require("../config/db");

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
// get all author details
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await executeQuery("SELECT * FROM authors");
    res.status(200).json({
      success: true,
      message: "Authors fetched successfully",
      data: authors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// add new author details
exports.addAuthor = async (req, res) => {
  const { full_name, email, bio } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required",
    });
  }

  try {
    const result = await executeQuery(
      "INSERT INTO authors (full_name, email, bio) VALUES (?, ?, ?)",
      [full_name, email, bio]
    );
    res.status(201).json({
      success: true,
      message: "Author added successfully",
      data: { id: result.insertId, full_name, email, bio },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// update existing author details
exports.updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, bio } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required",
    });
  }

  try {
    const result = await executeQuery(
      "UPDATE authors SET full_name = ?, email = ?, bio = ? WHERE author_id = ?",
      [full_name, email, bio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Author updated successfully",
      data: { id, full_name, email, bio },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Delete a author Details
exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeQuery("DELETE FROM authors WHERE author_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
