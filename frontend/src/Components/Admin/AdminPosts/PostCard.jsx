import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if admin is authenticated
  const imageUrl = post.featured_image
    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
    : "https://via.placeholder.com/300x200.png?text=No+Image";
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/posts/${post.id}`
        );
        alert("Post successfully deleted!");
        // Refresh or redirect logic here if needed
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };
  return (
    <div className="post-card border rounded-lg p-4 mb-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src={imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover rounded-md mb-4"
        loading='lazy'
      />
      <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
      <p className="text-gray-600">By {post.author_name}</p>
      <p className="text-sm mt-2 text-gray-600">{post.seoDescription}</p>
      <div className="mt-4 flex items-center justify-between">
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/admin/edit-post/${post.id}`)}
              className="text-yellow-500 hover:underline">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to create slug
const createSlug = (title) => {
  // Check if the title is not null and is a string before processing
  if (typeof title !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export default PostCard;
