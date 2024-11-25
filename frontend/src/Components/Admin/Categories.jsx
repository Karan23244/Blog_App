// CategoriesTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_type: "",
    category_name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/categories`
    );
    setCategories(response.data.data);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/categories/${editingId}`,
        formData
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        formData
      );
    }
    setFormData({ category_type: "", category_name: "", description: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setEditingId(category.category_id);
    setFormData({
      category_name: category.category_name,
      description: category.description,
    });
  };

  const handleDelete = async (category_id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/categories/${category_id}`
    );
    fetchCategories();
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          value={formData.category_name}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
        />
        <select
          name="category_type"
          value={formData.category_type || ""}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded"
          required>
          <option value="" disabled>
            Select Category Type
          </option>
          <option value="Upgrade Yourself">Upgrade Yourself</option>
          <option value="Home Insights">Home Insights</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full text-left table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id} className="hover:bg-gray-100">
              <td className="border p-2">{category.category_name}</td>
              <td className="border p-2">{category.description}</td>
              <td className="border p-2">{category.category_type}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.category_id)}
                  className="bg-red-500 text-white px-4 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
