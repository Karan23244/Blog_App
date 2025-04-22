import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../New_Post/styles.css";
import usePageTracker from "../../../hooks/usePageTracker";
import CommentSection from "./Comments";
const FullPost = () => {
  usePageTracker("blogs");
  const { param2 } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);
  const blogAds = [
    {
      id: "interior-design-ideas-glass-mirrors",
      image: "/toptop_ad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6221&pub_id=469&p1=click_id&source=hi",
    },
    {
      id: "budget-friendly-window-and-door-renovation-ideas",
      image: "/windowad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6259&pub_id=579",
    },
    {
      id: "homeowners-guide-to-going-solar",
      image: "/solarad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6258&pub_id=579",
    },
    {
      id: "budget-friendly-diy-bathroom-makeover-ideas",
      image: "/bathroomad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6260&pub_id=579",
    },
    {
      id: "choose-the-best-roofing-materials",
      image: "/roofad.webp",
      link: "https://tracking.clickorbits.in/click?campaign_id=6261&pub_id=579",
    },
  ];
  const adData = blogAds.find((blog) => blog.id === param2);
  const fetchComments = async () => {
    try {
      // ✅ Check if post exists and has at least one item before accessing post[0].id
      if (!post || post.length === 0) {
        console.warn("No post found. Skipping fetchComments.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/${post.id}`
      );
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // useEffect(() => {
  //   if (fetchedRef.current) return;
  //   fetchedRef.current = true;
  //   setPost(null);
  //   setError(null);

  //   const fetchPost = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}/api/posts/${param2}`,
  //         { withCredentials: true }
  //       );
  //       setPost(response.data.data);
  //     } catch (err) {
  //       console.error("Error fetching post:", err);
  //       setError("Unable to load the post. Please try again later.");
  //     }
  //   };

  //   fetchPost();
  // }, [param2]);

  useEffect(() => {
    setPost(null);
    setError(null);
  
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${param2}`,
          { withCredentials: true }
        );
        setPost(response.data.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Unable to load the post. Please try again later.");
      }
    };
  
    fetchPost();
  }, [param2]);
  console.log(post)

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
      const fetchRelatedBlogs = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/posts/related/${
              post.category_names
            }`
          );
          setRelatedBlogs(response.data.data);
        } catch (err) {
          console.error("Error fetching related blogs:", err);
        }
      };

      fetchRelatedBlogs();
      setToc(tocData);
      // Set the updated content only once
      const updatedContent = contentDocument.body.innerHTML;
      setUpdatedContent(updatedContent);
      fetchComments();
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
  const imageUrl = post.featured_image
    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
    : "";
  const adimageUrl = post.AdImage
    ? `${import.meta.env.VITE_API_URL}/${post.AdImage}`
    : "";
  //current url
  const currentUrl = window.location.href;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return alert("All fields are required!");

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: post.id, name, comment }),
      });

      if (res.ok) {
        setName("");
        setComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    setLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>{post.seoTitle || "Blog Post"}</title>
        <meta name="description" content={post.seoDescription || ""} />
        <meta property="og:title" content={post.seoTitle || "Blog Post"} />
        <meta property="og:description" content={post.seoDescription || ""} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      <div
        className="bg-white bg-cover bg-center h-[400px] rounded-lg relative"
        style={{
          backgroundImage: `url(${post.featured_image ? imageUrl : ""})`,
        }}>
        <div className="absolute w-full md:p-8 flex flex-col justify-evenly h-full bg-opacity-60 bg-black">
          <div className="flex flex-col justify-start ml-[4%] mr-[20%]">
            <h1 className="lg:text-5xl text-xl font-semibold text-white mb-4">
              {post.title || "Untitled"}
            </h1>
            <div className="flex gap-3">
              <p className="text-white font-semibold text-xl">
                By {post.author_name || "Unknown Author"}
              </p>
              <div className="border-l-2 pl-3 border-white">
                <p className="text-white font-semibold text-xl">
                  {new Date(
                    post.scheduleDate || post.created_at
                  ).toLocaleDateString("en-US", {
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
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for Table of Contents */}
          <aside className="hidden lg:block w-1/4 pr-8 ">
            <div className="sticky top-16 p-4 overflow-auto border-r-2 border-black h-screen">
              <h2 className="text-3xl text-center font-semibold text-gray-900 mb-2">
                Table of Contents
              </h2>
              <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
              <ul className="space-y-3">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={`padding-${
                      item.level === "h2"
                        ? "4"
                        : item.level === "h3"
                        ? "8"
                        : "0"
                    }
                      ${
                        activeSection === item.id
                          ? "font-bold text-blue-600"
                          : "text-gray-800"
                      }`}>
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
            <div
              className="custom-html text-gray-700 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: updatedContent }}
            />
            <CommentSection
              comments={comments}
              handleSubmit={handleSubmit}
              loading={loading}
              name={name}
              setName={setName}
              comment={comment}
              setComment={setComment}
            />
          </main>

          {adData && (
            <aside className="lg:w-1/4">
              <div className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen">
                <Link to={adData.link} target="_blank">
                  <img src={adData.image} alt="ad" />
                </Link>
              </div>
            </aside>
          )}
          {post.AdImage && (
            <aside className="lg:w-1/4">
              <div className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen">
                <Link to={post.ad_url} target="_blank">
                  <img src={adimageUrl} alt="ad" />
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
      <div className="bg-[#F0F2F5]">
        {/* Related Blog Section */}
        {relatedBlogs.length > 0 && (
          <div className="lg:mx-[10%] lg:mt-12 py-5">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Related Blogs
            </h2>
            <div className="grid md:grid-cols-4 gap-6 py-5">
              {relatedBlogs.map((blog) => (
                <Link
                  to={`/${createSlug(
                    blog?.category_names[0]
                  )}/${createSlug(blog?.Custom_url)}`}
                  className="block">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${
                      blog.featured_image
                    }`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {blog.seoDescription}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
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
export default FullPost;
