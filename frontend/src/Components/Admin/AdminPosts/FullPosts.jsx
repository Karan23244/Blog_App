import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../New_Post/styles.css"
const FullPost = () => {
 const { id_or_slug } = useParams();
  const [post, setPost] = useState(null);
  const fetchedRef = useRef(false); // To prevent multiple fetches

  useEffect(() => {
    if (fetchedRef.current) return; // If already fetched, do nothing
    fetchedRef.current = true; // Mark as fetched

    const fetchPost = async () => {
                    try {
                        const response = await fetch(
                            `${import.meta.env.VITE_API_URL}/api/posts/${id_or_slug}`
                        );
                        const responseData = await response.json();
                        setPost(responseData.data);
                    } catch (error) {
                        console.error("Error fetching post:", error);
                    }
                };
        
                fetchPost();
  }, [id_or_slug]);

  if (!post) {
    return <p>Loading...</p>;
  }

  // Function to create a slug from the post title
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
  const postSlug = createSlug(post.Custom_url);
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
            content={`${import.meta.env.VITE_API_URL}/${postSlug}`}
          />
        </Helmet>

        {/* Blog Post Content */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex gap-3">
            <div>
              <p className="text-gray-600 mb-4">By {post.author_name}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-6">{timeAgo(post.created_at)}</p>
            </div>
          </div>

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
            className="custom-html text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: decodedContent }}
          />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default FullPost;