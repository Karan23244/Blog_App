import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../New_Post/styles.css";

const FullPost = () => {
  const { id_or_slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${id_or_slug}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }
        const responseData = await response.json();
        setPost(responseData.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Unable to load the post. Please try again later.");
      }
    };

    fetchPost();
  }, [id_or_slug]);

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  const createSlug = (title) => {
    if (typeof title !== "string") return "";
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const replaceImageUrls = (content) => {
    const baseUrl = `${import.meta.env.VITE_API_URL}`; // Correct base URL
  
    // Match <img> tags and adjust src paths
    return content.replace(/<img\s+[^>]*src="([^"]+)"/g, (match, src) => {
      if (src.startsWith("uploads/")) {
        const correctedSrc = `${baseUrl}/${src}`;
        return match.replace(src, correctedSrc);
      }
  
      // Fix incorrect prefix
      if (src.includes("smart-home-technology/uploads/")) {
        const correctedSrc = src.replace("smart-home-technology/", "");
        return match.replace(src, correctedSrc);
      }
  
      return match; // Leave other paths unchanged
    });
  };
  

  const decodedContent = replaceImageUrls(decodeHtml(post.content || ""));
  const imageUrl = post.featured_image
    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
    : "";
  const postSlug = createSlug(post.Custom_url);
  const timeAgo = (dateString) => {
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
  };

  return (
    <HelmetProvider>
      <div className="container mx-auto px-4 py-6 md:px-8 lg:px-16">
        <Helmet>
          <title>{post.seoTitle || "Blog Post"}</title>
          <meta name="description" content={post.seoDescription || ""} />
          <meta property="og:title" content={post.seoTitle || "Blog Post"} />
          <meta
            property="og:description"
            content={post.seoDescription || ""}
          />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_API_URL}/${postSlug}`}
          />
        </Helmet>

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            {post.title || "Untitled"}
          </h1>
          <div className="flex gap-3">
            <p className="text-gray-600 mb-4">
              By {post.author_name || "Unknown Author"}
            </p>
            <p className="text-gray-500 mb-6">{timeAgo(post.created_at)}</p>
          </div>

          {post.featured_image && (
            <img
              src={imageUrl}
              alt={post.title || "Featured"}
              className="w-full lg:h-[400px] h-[400px] object-cover rounded-md mb-6"
            />
          )}

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
