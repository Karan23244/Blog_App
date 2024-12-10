import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Admin/New_Post/styles.css"
function UserHome() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [topReads, setTopReads] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);
  const [imagePreloaded, setImagePreloaded] = useState(false);
  //preload Image
  const preloadLCPImage = (url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  };
  useEffect(() => {
    if (posts.length === 0) {
      // Prevent fetching if posts already exist
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts`
          );
          const responseData = await response.json();
          const filteredPosts = responseData.data.filter(
            (post) => post.blog_type === "published"
          );
          setPosts(filteredPosts);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }

    if (topReads.length === 0 && editorsChoice.length === 0) {
      // Prevent fetching if top reads are already loaded
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts/topReadsAndEditorsChoice`
          );
          const result = await response.json();
          const filteredtopReadsPosts = result.data.topReads.filter(
            (post) => post.blog_type === "published"
          );
          const filterededitorsChoicePosts = result.data.editorsChoice.filter(
            (post) => post.blog_type === "published"
          );
          setTopReads(filteredtopReadsPosts);
          setEditorsChoice(filterededitorsChoicePosts);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [posts, topReads]); // Adding posts and topReads as dependencies

  useEffect(() => {
    if (posts && posts[0]?.featured_image && !imagePreloaded) {
      const imageUrl = `${import.meta.env.VITE_API_URL}/${
        posts[0]?.featured_image
      }`;
      preloadLCPImage(imageUrl);
      setImagePreloaded(true); // Mark the image as preloaded
    }
  }, [posts, imagePreloaded]);

  return (
    <div className="lg:px-10 lg:py-5 px-5 py-5">
      {loading ? (
        <p className="text-gray-500 text-center h-screen">Loading...</p>
      ) : error ? (
        <p className="text-gray-500 text-center h-screen">{error}</p>
      ) : posts?.length === 0 ? (
        <p className="text-gray-500 text-center h-screen">
          No matching blog posts found.
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-evenly gap-6">
          {/* Latest Blogs Section */}
          <div className="flex flex-col lg:w-2/3 lg:gap-4 gap-2">
            <h2 className="lg:text-2xl text-base font-semibold text-black">
              Latest Blogs
            </h2>

            {/* Featured Post */}
            {posts && posts.length > 0 && (
              <div
                key={posts[0].id}
                className="relative overflow-hidden hover:shadow-md">
                <Link
                  to={`/${createSlug(posts[0]?.category_names[0])}/${createSlug(
                    posts[0]?.Custom_url
                  )}`}
                  className="block">
                  <div className="relative w-full lg:h-[300px] h-[200px]">
                    <img
                      src={
                        posts[0]?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              posts[0]?.featured_image
                            }`
                          : "https://via.placeholder.com/600x400.png?text=No+Image"
                      }
                       loading="lazy"
                      fetchpriority="high"
                      importance="high"
                      alt={posts[0]?.title}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-custom"></div>
                  </div>
                  <div className="absolute bottom-0 left-0  text-white p-4 w-full">
                    <h3 className="lg:text-2xl text-lg font-medium line-clamp-2">
                      {posts[0]?.title}
                    </h3>
                    <p className="lg:text-sm text-xs mt-1 line-clamp-2">
                      {posts[0]?.seoDescription}
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* Smaller Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:gap-4 gap-2">
              {posts.slice(1, 7).map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden hover:shadow-md border border-gray-200">
                  <img
                    src={
                      post?.featured_image
                        ? `${import.meta.env.VITE_API_URL}/${
                            post?.featured_image
                          }`
                        : "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={post?.title}
                    className="img-responsive"
                    loading="lazy"
                  />
                  <div className="p-2">
                    <h3 className="lg:text-base text-sm font-semibold line-clamp-2">
                      {post?.title}
                    </h3>
                    <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                      {post?.seoDescription}
                    </p>
                    <Link
                      to={`/${createSlug(post?.category_names[0])}/${createSlug(
                        post?.Custom_url
                      )}`}
                      className="text-[#00008B] hover:underline inline-block">
                      Read More...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* top reads section */}
          <div className="lg:w-1/2 w-full mb-8">
            <h2 className="lg:text-2xl text-base font-semibold mb-4 text-black">
              Top Reads
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {topReads.map((post) => (
                <React.Fragment key={post.id}>
                  <div className="post-card flex flex-row gap-4 transition-shadow duration-300 ease-in-out">
                    <div className="w-2/5">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        width="100%"
                        style={{
                          height: "140px",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-3 w-3/5">
                      <h3 className="lg:text-base text-sm font-semibold text-gray-800 line-clamp-2">
                        {post?.title}
                      </h3>
                      <p className="lg:text-sm text-xs mt-1 text-gray-600 line-clamp-2">
                        {post?.seoDescription}
                      </p>
                      <Link
                        to={`/${createSlug(
                          posts[0]?.category_names[0]
                        )}/${createSlug(post?.Custom_url)}`}
                        className="self-start mt-1">
                        <button className="lg:text-base text-sm text-white px-5 py-2 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:from-[#00008B] hover:to-[#00008B] hover:shadow-lg transition duration-300 ease-in-out">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                  <hr className="w-full text-gray-300" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Editor's Choice Section */}
          <div className="lg:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4 text-black">
              Editor’s Choice
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {editorsChoice.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg border border-gray-200 transition-shadow duration-300 ease-in-out transform">
                  <img
                    src={
                      post?.featured_image
                        ? `${import.meta.env.VITE_API_URL}/${
                            post?.featured_image
                          }`
                        : "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={post?.title}
                    loading="lazy"
                    width="100%"
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="p-2">
                    <h3 className="lg:text-base text-sm font-semibold text-gray-800 line-clamp-2">
                      {post?.title}
                    </h3>
                    <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                      {post?.seoDescription}
                    </p>
                    <Link
                      to={`/${createSlug(
                        posts[0]?.category_names[0]
                      )}/${createSlug(post?.Custom_url)}`}
                      className="text-[#00008B] hover:underline mt-1 inline-block">
                      <button className="lg:text-base text-sm text-white px-4 py-1 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:from-[#00008B] hover:to-[#00008B] hover:shadow-lg transition duration-300 ease-in-out">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

export default UserHome;
