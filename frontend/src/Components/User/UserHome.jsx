import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Admin/New_Post/styles.css";
import CustomCarousel from "./CustomCrousel";
import usePageTracker from "../../hooks/usePageTracker";
import { Helmet } from "react-helmet-async";
function UserHome() {
  usePageTracker("home");
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
    <>
      <Helmet>
        <title>Home Improvement Ideas & Design | HomImprovement</title>
        <meta
          name="description"
          content="Upgrade your home with the best home improvement tips & interior design ideas. Get inspired with DIY projects, décor trends, and start your dream home today!"
        />
        <meta
          name="keywords"
          content="Home improvement,Home renovation tips,Interior design ideas,Home decor inspiration, House renovation,home improvement ideas"
        />
        <meta
          property="og:title"
          content="Home Improvement Ideas & Design | HomImprovement"
        />
        <meta
          property="og:description"
          content="Upgrade your home with the best home improvement tips & interior design ideas. Get inspired with DIY projects, décor trends, and start your dream home today!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homimprovement.com" />
        <link rel="canonical" href="https://homimprovement.com" />
      </Helmet>
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
          <>
            <div className="flex flex-col lg:flex-row lg:justify-evenly gap-6 items-stretch h-full">
              {/* Latest Blogs Section */}
              <div className="flex flex-col lg:w-2/3 gap-4 h-full">
                <h1 className="lg:text-2xl text-base font-semibold text-black">
                  Latest Blogs
                </h1>
                {posts && posts.length > 0 && (
                  <div className="relative overflow-hidden hover:shadow-md flex-grow">
                    <Link
                      to={`/${createSlug(
                        posts[0]?.category_names[0]
                      )}/${createSlug(posts[0]?.Custom_url)}`}
                      className="block h-full">
                      <div className="relative w-full lg:h-[350px] h-[200px]">
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
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-custom"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 text-white p-4 w-full">
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
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 flex-grow">
                  {posts.slice(1, 7).map((post) => (
                    <div
                      key={post.id}
                      className="overflow-hidden hover:shadow-md border border-gray-200 flex flex-col h-full">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 flex flex-col flex-grow">
                        <h3 className="lg:text-base text-sm font-semibold line-clamp-2">
                          {post?.title}
                        </h3>
                        <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                          {post?.seoDescription}
                        </p>
                        <Link
                          to={`/${createSlug(
                            post?.category_names[0]
                          )}/${createSlug(post?.Custom_url)}`}
                          className="text-[#00008B] hover:underline inline-block mt-auto">
                          Read More...
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Reads Section */}
              <div className="lg:w-1/2 w-full flex flex-col gap-4 h-full">
                <h2 className="lg:text-2xl text-base font-semibold mb-4 text-black">
                  Top Reads
                </h2>
                <div className="grid grid-cols-1 gap-4 h-full">
                  {topReads.slice(0, 7).map((post) => (
                    <div
                      key={post.id}
                      className="post-card flex flex-row gap-4 hover:shadow-md h-full">
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
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="flex flex-col  w-3/5 h-full">
                        <h3 className="lg:text-base text-sm font-semibold text-gray-800 line-clamp-3">
                          {post?.title}
                        </h3>
                        <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                          {post?.seoDescription}
                        </p>
                        <Link
                          to={`/${createSlug(
                            post?.category_names[0]
                          )}/${createSlug(post?.Custom_url)}`}
                          className="mt-auto">
                          <button className="lg:text-base text-sm text-white px-5 py-2 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:shadow-lg">
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor's Choice Section */}
              <div className="lg:w-1/2 w-full flex flex-col gap-4 h-full">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  Editor’s Choice
                </h2>
                <div className="grid grid-cols-2 gap-4 h-full">
                  {editorsChoice.slice(0, 8).map((post) => (
                    <div
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg border border-gray-200 flex flex-col h-full">
                      <img
                        src={
                          post?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post?.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 flex flex-col flex-grow">
                        <h3 className="lg:text-base text-sm font-semibold text-gray-800 line-clamp-2">
                          {post?.title}
                        </h3>
                        <p className="lg:text-sm text-xs text-gray-600 line-clamp-2">
                          {post?.seoDescription}
                        </p>
                        <Link
                          to={`/${createSlug(
                            post?.category_names[0]
                          )}/${createSlug(post?.Custom_url)}`}
                          className="mt-auto">
                          <button className="lg:text-base text-sm text-white px-4 py-1 bg-gradient-to-r from-[#00008B] to-[#00008B] rounded-md shadow-md hover:shadow-lg">
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="mt-8 md:mt-[5%]">
          <div className="text-xl md:text-5xl font-bold text-center px-4">
            <h2>Recommended Videos for You</h2>
          </div>
          <div className="text-base md:text-2xl font-medium text-center lg:mt-5 mt-2 px-4">
            <h2>
              Explore fresh perspectives on home improvement that inspire and
              excite.
            </h2>
          </div>
          <div>
            <CustomCarousel>
              <video
                autoPlay
                muted
                loop
                className="h-[50vh] md:h-[70vh] w-full object-cover">
                <source src="/vid4.mp4" />
              </video>
              <video
                autoPlay
                muted
                loop
                className="h-[50vh] md:h-[70vh] w-full object-cover">
                <source src="/vid1.mp4" />
              </video>
              <video
                autoPlay
                muted
                loop
                className="h-[50vh] md:h-[70vh] w-full object-cover">
                <source src="/vid2.mp4" />
              </video>
              <video
                autoPlay
                muted
                loop
                className="h-[50vh] md:h-[70vh] w-full object-cover">
                <source src="/vid3.mp4" />
              </video>
            </CustomCarousel>
          </div>
        </div>
        <CategoryBlogs posts={posts} />
        <OurMission />
      </div>
    </>
  );
}

const CategoryBlogs = ({ posts }) => {
  const categoryFilter = [
    {
      name: "Reviews",
      description: "Shop Smart: Read Our Expert Reviews Before You Buy!",
      adimg: "review.webp",
      link: "home-insights/reviews",
    },
    {
      name: "VS",
      description: "Compare the Best Products with Ease.",
      adimg: "vs.webp",
      link: "home-insights/how-to",
    },
    {
      name: "Best",
      description: "Find the Best Picks Curated Just for You!",
      adimg: "best.webp",
      link: "home-insights/vs",
    },
    {
      name: "How To",
      description: "Step-by-Step Guides for Everyday Solutions.",
      adimg: "howto.webp",
      link: "home-insights/best",
    },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.blog_type === "published" &&
      post.category_names.some((category) =>
        categoryFilter.some((filter) => filter.name === category)
      )
  );

  const groupedPosts = categoryFilter.map((category) => ({
    category,
    posts: filteredPosts.filter((post) =>
      post.category_names.includes(category.name)
    ),
  }));
  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8">
      {groupedPosts.map(({ category, posts }, index) => (
        <div
          key={category.name}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } gap-6`}>
          {/* Main Content */}
          <div className="mt-6 lg:w-3/4">
            <div className="text-3xl md:text-5xl font-bold text-center">
              <h2>{category.name === "How To" ? "How To ?" : category.name}</h2>
            </div>
            <div className="text-lg md:text-2xl font-medium text-center mt-4">
              {category.description}
            </div>
            {index % 2 === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8">
                {posts.slice(0, 3).map((post) => (
                  <Link
                    to={`/${createSlug(
                      posts[0]?.category_names[0]
                    )}/${createSlug(post?.Custom_url)}`}>
                    <div
                      key={post.id}
                      className="relative bg-[#E0E0E0] rounded-t-2xl group overflow-hidden shadow-lg h-[500px] flex flex-col">
                      <img
                        src={
                          post.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                post.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={post.title}
                        className="w-full h-[250px] object-cover mb-2 rounded-t-2xl"
                        loading="lazy"
                      />
                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold">{post?.title}</h3>
                        <p className="text-sm text-black pt-2">
                          {post?.seoDescription}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-[#E0E0E0] flex flex-col px-4 py-6 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-semibold">{post?.title}</h3>
                        <p className="text-sm pt-2">{post?.seoDescription}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {posts.slice(0, 3).map((post) => (
                  <Link
                    to={`/${createSlug(
                      posts[0]?.category_names[0]
                    )}/${createSlug(post?.Custom_url)}`}>
                    <div
                      key={post.id}
                      className="relative bg-white shadow-md overflow-hidden group perspective-1000 min-h-[350px] flex flex-col">
                      <div className="relative w-full h-[400px] transform-style-preserve-3d group-hover:scale-x-[-1] transition-transform duration-700">
                        <img
                          src={
                            post.featured_image
                              ? `${import.meta.env.VITE_API_URL}/${
                                  post.featured_image
                                }`
                              : "https://via.placeholder.com/300x200.png?text=No+Image"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-x-[-1] transition-transform duration-700"
                          loading="lazy"
                        />
                        {/* Title Overlay */}
                        <div className="absolute top-4 left-4 group-hover:opacity-0 text-white text-xl font-semibold z-10">
                          {post?.title}
                        </div>
                      </div>
                      <div className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity duration-500 p-6 bg-[#E0E0E0]">
                        <div>
                          <h3 className="text-2xl font-bold text-black">
                            {post?.title}
                          </h3>
                          <p className="text-black mt-4">
                            {post?.seoDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button className="bg-[#E0E0E0] text-sm md:text-xl px-6 md:px-8 py-3 md:py-4 text-black border-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-[#00008B] hover:text-white">
                <Link to={category.link} className="block">
                  Discover More
                </Link>
              </button>
            </div>
          </div>

          {/* Ad Section */}
          <div className="lg:w-3/12 flex justify-center items-center bg-gray-100 shadow-lg rounded-lg p-4">
            <div className="text-center">
              <Link to={category.link}>
                <img
                  src={category.adimg}
                  alt="Ad"
                  className="w-full h-auto object-contain mt-4 rounded-lg"
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const OurMission = () => {
  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8 py-5">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-black">
          Our Mission
        </h2>
      </div>

      <div className="text-black text-lg leading-relaxed text-justify space-y-4">
        <p>
          Well -Vaking to homimprovement, your final destination for all things
          related to home improvement! Whether you are planning a complete house
          renovation or simply looking for new interior design ideas, our site
          is here to inspire and guide it every step on the way. In
          homimprovement, we believe that your home is a reflection of your
          personality and style. This is why we offer a wide range of{" "}
          <Link
            to={`https://homimprovement.com/upgrade-yourself/diy-home-projects`}
            className="text-blue-500">
            home improvement ideas
          </Link>{" "}
          to help it turn your space into something truly special. From economic
          bridge projects to luxurious updates, our tips and resources meet all
          tastes and budgets
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 p-6 lg:p-12">
        {/* Left Section */}
        <div className="flex flex-col lg:w-1/2 space-y-6">
          <div className="text-lg text-black space-y-4 leading-relaxed">
            <p>
              Explore our collection curated by{" "}
              <Link
                to={`https://homimprovement.com/upgrade-yourself/interior-design-trends`}
                className="text-blue-500">
                interior design ideas
              </Link>{" "}
              to discover innovative ways to renew your living spaces. Whether
              you are updating an individual room or reimaging your entire home,
              our specialized advice and trend concepts will help you create a
              beautiful and beautiful space. Planning a house renovation? We
              have you covered! Our comprehensive guides and{" "}
              <Link
                to={`https://homimprovement.com/home-insights/how-to`}
                className="text-blue-500">
                step-by-step tutorials
              </Link>{" "}
              facilitate combat to the most challenging projects. From Kitchen
              Reforms to Bathroom Reforms, we provide practical solutions to
              bring your vision to life.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="mission1.jpeg"
              alt="Mission"
              className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col lg:w-1/2 space-y-6">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="mission2.jpeg"
              alt="Mission"
              className="w-full h-auto object-cover transform hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="text-lg text-black space-y-4 leading-relaxed">
            <p>
              Homimprovement is more than just a site - it is a community of
              passionate owners and design enthusiasts. Join us to share your
              projects, seek inspiration and connect to individuals who think
              the same way as they share their love for home improvement. Start
              your journey today and unlock the potential of your home. Visit
              homimprovement.com to get numerous home improvement ideas,{" "}
              <Link
                to={`https://homimprovement.com/home-insights/reviews`}
                className="text-blue-500">
                expert tips
              </Link>{" "}
              and the inspiration you need to create the home of your dreams!
            </p>
          </div>
        </div>
      </div>
    </div>
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

export default UserHome;
