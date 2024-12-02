import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [showDrafts, setShowDrafts] = useState(false); // State to toggle between draft and published posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const responseData = await response.json();
        const data = responseData.data; // Extract the 'data' array containing posts
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query (case-insensitive search for title and content)
  const filteredPosts = posts.filter((post) => {
    // Ensure title and content are not null or undefined before calling toLowerCase
    const matchesSearch =
      (post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post?.content?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      false;
  
    const matchesType = showDrafts ? post.blog_type === "draft" : post.blog_type !== "draft";
  
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex flex-wrap gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse h-40 w-full lg:w-1/3 bg-gray-200 rounded-md shadow-sm"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search and Toggle Drafts */}
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
        <button
          onClick={() => setShowDrafts(!showDrafts)}
          className={`ml-4 px-4 py-2 rounded ${
            showDrafts ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {showDrafts ? "View Published Blogs" : "View Draft Blogs"}
        </button>
      </div>

      {/* Render filtered posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
