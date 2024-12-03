import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Authslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if admin is authenticated

  useEffect(() => {
    // Fetch categories from your API or backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
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
      }
    };
    fetchPosts();
    fetchCategories(); // Call the function to fetch categories on component mount
  }, []);
  const groupedCategories = categories.reduce((acc, category) => {
    if (!acc[category.category_type]) {
      acc[category.category_type] = [];
    }
    acc[category.category_type].push(category);
    return acc;
  }, {});
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Refresh the page if the user is already on the home page
      window.location.reload();
    } else {
      // Navigate to the home page
      navigate("/");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Hide dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const matches = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matches.slice(0, 6));
      setShowDropdown(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(""); // Clear search input
    setSuggestions([]); // Clear suggestions
    setShowDropdown(false); // Close dropdown
    navigate(
      `/${createSlug(suggestion?.category_names[0])}/${createSlug(
        suggestion?.Custom_url
      )}`
    );
  };

  return (
    <header>
      <nav className="border-gray-200 px-4 lg:py-1 lg:px-7 py-2.5 border border-b-1 shadow-xl">
        <div className="flex">
          <div className="flex flex-row items-center gap-4 w-[40%]">
            <div onClick={handleLogoClick}>
              <img src="/headerlogo.png" alt="Logo" width={80} height={80} />
            </div>

            {/* Horizontal Divider */}
            <div className="w-[2px] h-12 bg-black"></div>
            <div>
              <h1 className="text-lg font-medium text-center">
                Inspiring Spaces for Life
              </h1>
            </div>
          </div>

          <div className="flex items-center lg:order-2">
            <button
              onClick={toggleMenu}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
              <svg
                className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            }  items-center lg:flex justify-end lg:w-[60%] lg:order-1`}
            id="mobile-menu-2">
            <ul className="flex flex-col items-center gap-5 text-black font-medium lg:flex-row">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/admin/category"
                      className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-[#00008B] font-bold">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/authors"
                      className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-[#00008B] font-bold">
                      Authors
                    </Link>
                  </li>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-blue-600 hover:bg-[#00008B] focus:ring-4 focus:ring-[#00008B] rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 font-bold focus:outline-none">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-row justify-center items-center gap-28">
                    <div
                      className={`${
                        isMenuOpen ? "block" : "hidden"
                      } w-full lg:flex lg:items-center lg:justify-between lg:w-auto `}>
                      <ul className="flex flex-col lg:flex-row lg:space-x-8 gap-14">
                        {Object.keys(groupedCategories).map((type) => (
                          <li className="relative group" key={type}>
                            <button className="block text-black text-xl hover:text-[#00008B] font-semibold">
                              {type}
                            </button>
                            <ul className="absolute hidden group-hover:block w-[250px] z-10 bg-white shadow-lg border border-black">
                              {groupedCategories[type].map((category) => (
                                <li
                                  key={category.category_id}
                                  className="p-1 hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200">
                                  <Link
                                    to={`/categoryData?categoryId=${
                                      category.category_id
                                    }&categoryName=${encodeURIComponent(
                                      category.category_name
                                    )}&categoryType=${encodeURIComponent(
                                      category.category_type
                                    )}`}
                                    className="block px-4 py-2 hover:border-gray-600  text-black">
                                    {category.category_name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search blogs..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#00008B]"
                      />
                      {showDropdown && (
                        <ul
                          ref={dropdownRef}
                          className="absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-10">
                             <div className="px-4">
                            <span className="text-md text-semibold">
                              Searching For
                            </span>
                          </div>
                          {suggestions.map((suggestion) => (
                            <li
                              key={suggestion?.id}
                              className="px-6 py-2 flex items-center font-medium justify-between hover:bg-gray-200 hover:border-black hover:border-l-4 cursor-pointer transition-transform duration-200"
                            onClick={() => handleSuggestionClick(suggestion)}>
                              <div>
                                <span className="flex-grow">
                                  {suggestion?.title}
                                </span>
                              </div>
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-700"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M7 17l9-9m0 0v6m0-6H10"
                                  />
                                </svg>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
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
export default Navbar;
