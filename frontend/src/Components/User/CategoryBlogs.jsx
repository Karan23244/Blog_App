import React from "react";
import usePostsByCategory from "../../hooks/usePostsByCategory";
import { Link } from "react-router-dom";
import usePageTracker from "../../hooks/usePageTracker";
import { Helmet } from "react-helmet-async";

const CategoryPosts = () => {
  usePageTracker("category");
  const { posts, loading, error, categoryName, categoryType } =
    usePostsByCategory();

  // Function to fetch SEO data based on category name
  const getSeoDetails = (category) => {
    const seoData = {
      "Smart Home Technology": {
        title: "Elevate Your Home with Smart Technology | Homimprovement",
        description:
          "Homimprovement offers cutting-edge smart home technology to elevate your lifestyle. Discover automation, security, and energy-saving solutions today!",
        keywords:
          "Smart Home Technology,Home Automation,Smart Home Solutions,Energy Efficiency,Home Security Systems,Smart Devices,IoT Home Technology,Home Improvement,Smart Living,Home Tech Innovations",
        
      },
      "DIY Home Projects": {
        title: "Homimprovement: Easy DIY Home Projects to Enhance Your Home",
        description:
          "Join Homimprovement for innovative DIY home projects. From simple crafts to major renovations, find inspiration and tips to enhance your home!",
        keywords:
          "DIY Home Projects,Home Improvement Ideas,Creative Home Renovations,Easy DIY Crafts,Home Decor Projects,Step-by-Step DIY Guides,Home Improvement Tips,DIY Crafts for Beginners,Home Makeover Ideas,Sustainable DIY Projects",
      },
      "Interior Design Trends": {
        title: "Homimprovement: Your Guide to Modern Interior Design Trends",
        description:
          "Stay updated with the latest interior design trends at Homimprovement. Find inspiration and tips to create your dream home today!",
        keywords:
          "Interior Design Trends,Modern Home Decor,Home Improvement Ideas,Interior Design Inspiration,Latest Design Styles,Home Decor Tips,Contemporary Interior Design,Stylish Home Makeovers,Interior Design Ideas,Home Renovation Trends",
      },
      "How to ?": {
        title: "Home Improvement Made Easy: Step-by-Step Guides",
        description:
          "Discover practical home improvement tips to enhance your living space. Transform your home with our easy-to-follow guides!",
        keywords:
          "Home Improvement,Home Renovation Tips,Home Maintenance,Outdoor Improvement,Home Decor Ideas",
      },
      "Best": {
        title: "Best Home Improvement Ideas for Every Space | Homimprovement",
        description:
          "Explore the best home improvement solutions, DIY tips, and renovation ideas for every space in your house. Homimprovement has you covered!",
        keywords:
          "Best home improvement ideas,Best home upgrades,Best budget home products, Best home improvement tips, Best home improvement projects, Best tools for DIY home improvement, Best home upgrades for resale value, Best home renovation ideas, Best living room decor upgrades, Best seasonal home maintenance tips",
      },
      "VS": {
        title: "Expert Tips and Comparisons for Home Improvement Versus",
        description:
          "Uncover the best home improvement strategies with Versus. Get expert comparisons and tips to elevate your living space today!",
        keywords: "Home Improvement Versus, Product Versus, Traditional vs Modern Homes, DIY vs Professional Home Improvement, Renovation vs Remodeling, Interior Design vs Interior Decoration, Smart Home vs Regular Home",
      },
      "Reviews": {
        title: "Discover Top Home Improvement Reviews at Homimprovement",
        description:
          "Looking for reliable home improvement reviews? Homimprovement provides expert insights to help you choose the right products for your home.",
        keywords:
          "Home improvement reviews,Product reviews,Home improvement products,DIY home improvement,Home renovation reviews,Best home improvement tools,Home improvement tips,Expert product reviews,Home improvement advice,Reliable home improvement insights",
      },
    };

    return (
      seoData[category] || {
        title: "Homimprovement | Home Improvement Blog",
        description:
          "Explore a wide range of home improvement ideas and trends.",
        keywords: "Home Improvement, DIY, Interior Design, Smart Technology",
      }
    );
  };
  const { title, description, keywords } = getSeoDetails(categoryName);
  if (loading)
    return <div className="text-gray-500 text-center h-screen">Loading...</div>;
  if (error)
    return (
      <div className="text-gray-500 text-center h-screen">
        Error: {error.message}
      </div>
    );
  // Sort posts by view_count in descending order
  const sortedPosts = [...posts].sort((a, b) => b.view_count - a.view_count);
  const mostViewedPost = sortedPosts[0]; // Most viewed post
  const remainingPosts = sortedPosts.slice(1); // Remaining posts
  // UI for Upgrade Yourself category
  const UpgradeYourselfUI = () => (
    <>
      <div
        className="relative w-full lg:h-[200px] h-[150px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(90deg, #000025 0%, rgba(0, 0, 139, 0.3) 100%), url('./background.webp')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-xl font-semibold text-center text-white">
          {categoryName}
        </h1>
      </div>
      <div className="lg:px-[15%] lg:py-[2%] px-[2%] py-[2%] bg-[#00008B] bg-opacity-30">
        {mostViewedPost && (
          <div className="mb-6">
            <h2 className="lg:text-2xl text-lg font-semibold mb-2">
              {mostViewedPost.title}
            </h2>
            <Link
              to={`/${createSlug(
                mostViewedPost?.category_names[0]
              )}/${createSlug(mostViewedPost?.Custom_url)}`}
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
                loading="lazy"
              />
              <p className="lg:text-lg text-base text-gray-700">
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
                loading="lazy"
              />
              <div className="p-2">
                <h3 className="lg:text-md text-base font-semibold line-clamp-2">
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
    </>
  );

  const HomeInsightsUI = () => (
    <>
      {/* Category Title Section */}
      <div className="relative w-full lg:h-[150px] h-[100px] bg-cover bg-center flex items-center justify-center">
        <h1 className="lg:text-5xl text-xl font-semibold text-center text-black">
          {categoryName}
        </h1>
      </div>

      {/* Posts Section */}
      <div className="lg:mx-[10%] mx-[2%]">
        <div className="mb-5">
          <h2 className="lg:text-3xl text-xl font-semibold text-left text-black underline">
            Latest about {categoryName}
          </h2>
        </div>

        {posts && posts.length > 0 && (
          <>
            {/* Top Section: Featured Post and Smaller Cards */}
            <div className="grid lg:gap-4 gap-2 lg:grid-cols-3">
              {/* Featured Post (Big Card) */}
              <div className="relative lg:col-span-2 order-1 lg:order-none">
                <Link
                  to={`/${createSlug(posts[0]?.category_names[0])}/${createSlug(
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
                    className="w-full lg:h-[450px] h-[250px] object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="text-black pt-3">
                  <h3 className="lg:text-2xl text-lg line-clamp-2 font-semibold">
                    {posts[0]?.title}
                  </h3>
                  <p className="lg:text-lg text-base mt-2 lg:line-clamp-4 line-clamp-2">
                    {posts[0]?.seoDescription}
                  </p>
                </div>
              </div>

              {/* Smaller Cards */}
              <div className="flex flex-col lg:gap-4 gap-2 order-2 lg:order-none">
                {posts.slice(1, 3).map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col overflow-hidden bg-white">
                    <Link
                      to={`/${createSlug(post?.category_names[0])}/${createSlug(
                        post?.Custom_url
                      )}`}
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
                        loading="lazy"
                      />
                    </Link>
                    <div className="text-black lg:p-4">
                      <h3 className="lg:text-lg text-base font-semibold">
                        {post?.title}
                      </h3>
                      <p className="lg:text-base text-sm mt-1 line-clamp-2">
                        {post?.seoDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className=" border-gray-300 my-5" />
            {/* Remaining Posts Section */}
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 lg:mt-8 pb-8">
              {posts.slice(3).map((post) => (
                <>
                  <div
                    key={post.id}
                    className="flex flex-row items-start lg:gap-10 gap-2">
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
                        className="w-full lg:h-[150px] h-[130px] object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/3">
                      <h3 className="lg:text-lg text-base font-semibold line-clamp-2">
                        {post?.title}
                      </h3>
                      <p className="lg:text-base text-sm text-gray-600 mt-2 line-clamp-2">
                        {post?.seoDescription}
                      </p>
                      <Link
                        to={`/${createSlug(
                          post?.category_names[0]
                        )}/${createSlug(post?.Custom_url)}`}
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
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content= {description}/>
        <meta property="og:type" content="Category Blogs" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_API_URL}`}
        />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_API_URL}`}
        />
      </Helmet>
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
