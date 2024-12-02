import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserHome() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [topReads, setTopReads] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/topReadsAndEditorsChoice`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // Filter data to include only posts with blog_type: "published"
        const filteredTopReads = (result.data.topReads || []).filter(
          (post) => post.blog_type === "published"
        );
        const filteredEditorsChoice = (result.data.editorsChoice || []).filter(
          (post) => post.blog_type === "published"
        );

        setTopReads(filteredTopReads);
        setEditorsChoice(filteredEditorsChoice);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-10 py-5">
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
          <div className="flex flex-col lg:w-2/3 gap-4">
            <h2 className="text-2xl font-semibold text-black">Latest Blogs</h2>

            {/* Featured Post */}
            {posts && posts.length > 0 && (
              <div
                key={posts[0].id}
                className="relative overflow-hidden hover:shadow-md">
                <Link
                  to={`/posts/${posts[0]?.id}/${createSlug(
                    posts[0]?.Custom_url
                  )}`}
                  className="block">
                  <div class="relative w-full h-[300px]">
                    <img
                      src={
                        posts[0]?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              posts[0]?.featured_image
                            }`
                          : "https://via.placeholder.com/600x400.png?text=No+Image"
                      }
                      alt={posts[0]?.title}
                      className="w-full h-full object-cover"
                    />
                    <div class="absolute top-0 left-0 w-full h-full bg-gradient-custom"></div>
                  </div>
                  <div className="absolute bottom-0 left-0  text-white p-4 w-full">
                    <h3 className="text-2xl font-medium line-clamp-2">
                      {posts[0]?.title}
                    </h3>
                    <p className="text-sm mt-1 line-clamp-2">
                      {posts[0]?.seoDescription}
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* Smaller Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-md font-semibold line-clamp-2">
                      {post?.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post?.seoDescription}
                    </p>
                    <Link
                      to={`/posts/${post?.id}/${createSlug(post?.Custom_url)}`}
                      className="text-[#00008B] hover:underline inline-block">
                      Read More...
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Top Reads
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {topReads.map((post) => (
                <React.Fragment key={post.id}>
                  <div className="post-card flex flex-col sm:flex-row gap-4 transition-shadow duration-300 ease-in-out">
                    <div className="lg:w-2/5">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full h-[130px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1 lg:w-3/5">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                        {post?.title}
                      </h3>
                      <p className="text-sm mt-1 text-gray-600 line-clamp-2">
                        {post?.seoDescription}
                      </p>
                      <Link
                        to={`/posts/${post?.id}/${createSlug(
                          post?.Custom_url
                        )}`}
                        className="self-start mt-1">
                        <button className="text-xs text-white px-2 py-1 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:from-[#00008B] hover:to-[#00008B] hover:shadow-lg transition duration-300 ease-in-out">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full lg:h-[100px] h-48 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                      {post?.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post?.seoDescription}
                    </p>
                    <Link
                      to={`/posts/${post?.id}/${createSlug(post?.Custom_url)}`}
                      className="text-[#00008B] hover:underline mt-1 inline-block">
                      <button className="text-xs text-white px-2 py-1 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:from-[#00008B] hover:to-[#00008B] hover:shadow-lg transition duration-300 ease-in-out">
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
