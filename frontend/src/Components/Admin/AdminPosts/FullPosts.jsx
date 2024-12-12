import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../New_Post/styles.css";

const FullPost = () => {
  const { id_or_slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setPost(null);
    setError(null);

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

  useEffect(() => {
    if (post) {
      // Generate TOC and add IDs to headings
      const parser = new DOMParser();
      const contentDocument = parser.parseFromString(
        decodeHtml(post.content || ""),
        "text/html"
      );
      const headings = Array.from(contentDocument.querySelectorAll("h2, h3"));
      const tocData = headings.map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id; // Assign ID to each heading
        return {
          id,
          text: heading.textContent,
          level: heading.tagName.toLowerCase(),
        };
      });
      setToc(tocData);
      // Set the updated content only once
      const updatedContent = contentDocument.body.innerHTML;
      setUpdatedContent(updatedContent);
    }
  }, [post]);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("h1, h2, h3");
    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTOCClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header or padding
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <p className="text-center text-red-600 h-screen">{error}</p>;
  }

  if (!post) {
    return <p className="text-gray-500 text-center h-screen">Loading...</p>;
  }
  const createSlug = (title) => {
    if (typeof title !== "string") return "";
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };
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
    <>
      <HelmetProvider>
        <div
          className="bg-white bg-cover bg-center h-[600px] rounded-lg relative"
          style={{
            backgroundImage: `url(${post.featured_image ? imageUrl : ""})`,
          }}>
          <div className="absolute w-full p-6 md:p-8 flex flex-col justify-between h-full bg-opacity-60 bg-black">
            <div className="flex flex-col justify-start mt-[10%] ml-[4%] mr-[20%]">
              <h1 className="lg:text-5xl text-xl font-semibold text-white mb-4 leading-4">
                {post.title || "Untitled"}
              </h1>
              <div className="flex gap-3">
                <p className="text-white font-semibold text-xl">
                  By {post.author_name || "Unknown Author"}
                </p>
                <div className="border-l-2 pl-3 border-white">
                  <p className="text-white font-semibold text-xl ">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            {/* Bottom spacing for the content */}
          </div>
        </div>

        <div className="mx-auto px-4 lg:px-8 pt-16">
          {/* Main Layout */}
          <div className="flex">
            {/* Sidebar for Table of Contents */}
            <aside className="hidden lg:block w-1/4 pr-8">
              <div className="sticky top-16 p-4 h-[calc(100vh-4rem)] overflow-auto border-r-2 border-black">
                <h2 className="text-3xl text-center font-semibold text-gray-900 mb-2">
                  Table of Contents
                </h2>
                <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
                <ul className="space-y-3">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={`pl-${
                        item.level === "h2"
                          ? "4"
                          : item.level === "h3"
                          ? "8"
                          : "0"
                      } ${
                        activeSection === item.id
                          ? "font-bold text-blue-600"
                          : "text-gray-800"
                      } text-lg`}>
                      <a
                        href={`#${item.id}`}
                        className="hover:text-blue-800 hover:underline text-lg font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTOCClick(item.id);
                        }}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Blog Content */}
            <main className="w-full lg:w-3/5">
              <Helmet>
                <title>{post.seoTitle || "Blog Post"}</title>
                <meta name="description" content={post.seoDescription || ""} />
                <meta
                  property="og:title"
                  content={post.seoTitle || "Blog Post"}
                />
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
              <div
                className="custom-html text-gray-700 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: updatedContent }}
              />
            </main>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default FullPost;
