import React from "react";
import usePostsByCategory from "../../hooks/usePostsByCategory";
import { Link } from "react-router-dom";

const CategoryPosts = () => {
  const { posts, loading, error, categoryName, categoryType } =
    usePostsByCategory();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Sort posts by view_count in descending order
  const sortedPosts = [...posts].sort((a, b) => b.view_count - a.view_count);
  const mostViewedPost = sortedPosts[0]; // Most viewed post
  const remainingPosts = sortedPosts.slice(1); // Remaining posts

  // UI for Upgrade Yourself category
  const UpgradeYourselfUI = () => (
    <>
      <div
        className="relative w-full h-[200px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(90deg, #000025 0%, rgba(0, 0, 139, 0.3) 100%), url('./background.jpeg')`,
          backgroundAttachment: "fixed",
        }}>
        <h1 className="text-5xl font-semibold text-center text-white">
          {categoryName}
        </h1>
      </div>
      <div className="lg:px-[15%] lg:py-[2%] bg-[#00008B] bg-opacity-30">
        {mostViewedPost && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {mostViewedPost.title}
            </h2>
            <Link
              to={`/posts/${mostViewedPost?.id}/${createSlug(
                mostViewedPost?.Custom_url
              )}`}
              className="block">
              <img
                src={
                  mostViewedPost.featured_image
                    ? `${import.meta.env.VITE_API_URL}/${
                        mostViewedPost.featured_image
                      }`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={mostViewedPost.title}
                className="w-full h-[300px] object-cover mb-4"
              />
              <p className="text-gray-700">
                {mostViewedPost.seoDescription ||
                  mostViewedPost.content.substring(0, 150)}
                ...
              </p>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {remainingPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                src={
                  post.featured_image
                    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
                    : "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={post.title}
                className="w-full h-40 object-cover mb-2"
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
    </>
  );

  const HomeInsightsUI = () => (
    <>
      {/* Category Title Section */}
      <div className="relative w-full h-[150px] bg-cover bg-center flex items-center justify-center">
        <h1 className="text-5xl font-semibold text-center text-black">
          {categoryName}
        </h1>
      </div>

      {/* Posts Section */}
      <div className="mx-[10%]">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-left text-black underline">
            Latest about {categoryName}
          </h1>
        </div>

        {posts && posts.length > 3 && (
          <>
            {/* Top Section: Featured Post and Smaller Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Featured Post (Big Card) */}
              <div className="col-span-2 relative">
                <Link
                  to={`/posts/${posts[0]?.id}/${createSlug(
                    posts[0]?.Custom_url
                  )}`}
                  className="block">
                  <img
                    src={
                      posts[0]?.featured_image
                        ? `${import.meta.env.VITE_API_URL}/${
                            posts[0]?.featured_image
                          }`
                        : "https://via.placeholder.com/600x400.png?text=No+Image"
                    }
                    alt={posts[0]?.title}
                    className="w-full h-[400px] object-cover"
                  />
                </Link>
                <div className="text-black pt-3">
                  <h3 className="text-2xl font-semibold">{posts[0]?.title}</h3>
                  <p className="text-sm mt-2">{posts[0]?.seoDescription}</p>
                </div>
              </div>

              {/* Smaller Cards */}
              <div className="col-span-1 flex flex-col gap-4">
                {posts.slice(1, 3).map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col overflow-hidden bg-white">
                    <Link
                      to={`/posts/${post?.id}/${createSlug(post?.Custom_url)}`}
                      className="block">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full h-[150px] object-cover"
                      />
                    </Link>
                    <div className="text-black p-4">
                      <h3 className="text-lg font-semibold">{post?.title}</h3>
                      <p className="text-sm mt-1">{post?.seoDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining Posts Section */}
            <div className="flex flex-col gap-6">
              {posts.slice(3).map((post) => (
                <>
                  <div
                    key={post.id}
                    className="flex flex-row items-start gap-10 border-b border-black pb-8">
                    <div className="w-5/12">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-[400px] h-[250px] object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{post?.title}</h3>
                      <p className="text-xl text-gray-600 mt-2 line-clamp-3">
                        {post?.seoDescription}
                      </p>
                      <Link
                        to={`/posts/${post?.id}/${createSlug(
                          post?.Custom_url
                        )}`}
                        className="text-blue-600 hover:underline mt-2 inline-block">
                        Read More...
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {categoryType === "Upgrade Yourself" && <UpgradeYourselfUI />}
      {categoryType === "Home Insights" && <HomeInsightsUI />}
    </>
  );
};

// Helper function to create slug
const createSlug = (title) => {
  return title
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export default CategoryPosts;
