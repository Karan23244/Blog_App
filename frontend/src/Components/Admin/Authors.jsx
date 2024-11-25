import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', bio: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch authors
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/authors`);
    setAuthors(response.data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/authors/${editingId}`, formData);
    } else {
      await axios.post('${import.meta.env.VITE_API_URL}/api/authors', formData);
    }
    setFormData({ full_name: '', email: '', bio: '' });
    setEditingId(null);
    setShowForm(false);
    fetchAuthors();
  };

  const handleEdit = (author) => {
    setEditingId(author.author_id);
    setFormData({ full_name: author.full_name, email: author.email, bio: author.bio });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/authors/${id}`);
    fetchAuthors();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setFormData({ full_name: '', email: '', bio: '' });
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Authors Management</h1>

      <button
        onClick={toggleForm}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
      >
        {showForm ? 'Back to Authors Table' : 'Add New Author'}
      </button>

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <textarea
              name="bio"
              placeholder="Biography"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            {editingId ? 'Update Author' : 'Add Author'}
          </button>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Bio</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.author_id}>
                  <td className="border px-4 py-2">{author.author_id}</td>
                  <td className="border px-4 py-2">{author.full_name}</td>
                  <td className="border px-4 py-2">{author.email}</td>
                  <td className="border px-4 py-2">{author.bio}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(author)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.author_id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Authors;
