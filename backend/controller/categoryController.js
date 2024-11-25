const db = require("../config/db");

/**
 * Utility function to handle database queries with async/await
 */
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

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await executeQuery("SELECT * FROM categories");
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addCategory = async (req, res) => {
  const { category_name, description, category_type } = req.body;

  if (!category_name || !category_type) {
    return res.status(400).json({
      success: false,
      message: "Category name and type are required",
    });
  }

  try {
    const result = await executeQuery(
      "INSERT INTO categories (category_name, description, category_type) VALUES (?, ?, ?)",
      [category_name, description, category_type]
    );
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: { id: result.insertId, category_name, description, category_type },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, description, category_type } = req.body;

  if (!category_name || !category_type) {
    return res.status(400).json({
      success: false,
      message: "Category name and type are required",
    });
  }

  try {
    const result = await executeQuery(
      "UPDATE categories SET category_name = ?, description = ?, category_type = ? WHERE category_id = ?",
      [category_name, description, category_type, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: { id, category_name, description, category_type },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await executeQuery("DELETE FROM categories WHERE category_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
