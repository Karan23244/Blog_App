import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const FullPost = () => {
  const { id } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState(null);
  const fetchedRef = useRef(false); // To prevent multiple fetches

  useEffect(() => {
    if (fetchedRef.current) return; // If already fetched, do nothing
    fetchedRef.current = true; // Mark as fetched

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${id}`
        );
        const responseData = await response.json();
        const data = responseData.data; // Extract the 'data' array containing posts
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  // Function to create a slug from the post title
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  };

  // Decode HTML entities and remove HTML tags
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Decode the post content
  const decodedContent = decodeHtml(post.content);
  const imageUrl = post.featured_image
    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
    : "";

  // Create the slug and use it in the URL
  const postSlug = createSlug(post.title);
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
  
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(days / 365);
    return `${years} years ago`;
  }
  return (
    <HelmetProvider>
      <div className="container mx-auto px-4 py-6 md:px-8 lg:px-16">
        <Helmet>
          <title>{post.seoTitle}</title>
          <meta name="description" content={post.seoDescription} />
          <meta property="og:title" content={post.seoTitle} />
          <meta property="og:description" content={post.seoDescription} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_API_URL}/${id}/${postSlug}`}
          />
        </Helmet>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <span className="mx-2"> &lt; </span>
          <span className="text-gray-700">Blogs</span>
        </div>

        {/* Blog Post Content */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-4">By {post.author_name}</p>
          <p className="text-gray-500 mb-6">{timeAgo(post.created_at)}</p>

          {/* Featured Image */}
          {post.featured_image && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full lg:h-[400px] h-[400px] object-cover rounded-md mb-6"
            />
          )}

          {/* Post Content */}
          <div
            className="content text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: decodedContent }}
          />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default FullPost;
