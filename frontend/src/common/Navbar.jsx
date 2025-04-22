import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Authslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import ScrollButtons from "./ScrollButton";
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
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

  const toggleMenu = () => {
    // If the search bar is open, close it when toggling the menu
    if (searchBarOpen) {
      setSearchBarOpen(false);
    }
    // Toggle the menu state
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    // If the menu is open, close it when toggling the search bar
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Toggle the search bar state
    setSearchBarOpen(!searchBarOpen);
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

  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (!acc[category.category_type]) {
        acc[category.category_type] = [];
      }
      acc[category.category_type].push(category);
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".suggestion-item")
      ) {
        setShowDropdown(false);
        setSearchBarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stable debounced function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        const matches = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(matches.slice(0, 6));
        setShowDropdown(matches.length > 0);
        setSearchBarOpen(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300),
    [posts]
  );
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the input value
    debouncedSearch(query); // Trigger debounced search
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(""); // Clear search input
    setSuggestions([]); // Clear suggestions
    setShowDropdown(false); // Close dropdown
    setSearchBarOpen(false);
    navigate(
      `/${createSlug(suggestion?.category_names[0])}/${createSlug(
        suggestion?.Custom_url
      )}`
    );
  };

  return (
    <>
      <header>
        <nav className="relative border-gray-200 border border-b-1 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center lg:gap-4 gap-2 lg:w-[40%] pl-3 py-1">
              <div onClick={handleLogoClick}>
                <img
                  src="/headerlogo.webp"
                  alt="Logo"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </div>
              {/* Horizontal Divider */}
              <div className="w-[2px] h-12 bg-black"></div>
              <div>
                <h2 className="lg:text-lg text-sm font-medium text-center">
                  Inspiring Spaces for Life
                </h2>
              </div>
            </div>

            <div className="flex items-center lg:order-2 pr-3">
              {!isAuthenticated && (
                <button
                  className="text-gray-600 mr-4 lg:hidden"
                  onClick={toggleSearchBar}
                  aria-label="Search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open main menu</span>
                {/* Hamburger Icon */}
                <svg
                  className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                {/* Close Icon */}
                <svg
                  className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Desktop Links */}
            <div
              className="lg:flex items-center hidden justify-end lg:w-[60%] lg:order-1 pr-3"
              id="mobile-menu-2">
              <div className="flex flex-col items-center gap-5 text-black font-medium lg:flex-row">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link
                        to="/admin/category"
                        className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-[#00008B] font-bold">
                        Category
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/admin/authors"
                        className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-[#00008B] font-bold">
                        Authors
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-blue-600 hover:bg-[#00008B] focus:ring-4 focus:ring-[#00008B] rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 font-bold focus:outline-none">
                      Logout
                    </button>
                  </>
            ):(
              <div>

              </div>
            )}
              </div>
            </div>

            {/* Mobile Links */}
            <div
              className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "opacity-100 top-[100%] visible"
                  : "opacity-0 -top-full invisible"
              }`}
              style={{ zIndex: 1000 }}>
              <ul className="space-y-4 p-4">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        to="/admin/category"
                        className="text-gray-700 hover:text-blue-600">
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/authors"
                        className="text-gray-700 hover:text-blue-600">
                        Authors
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                  
                    </div>
                  </>
                )}
              </ul>
            </div>

            {/* Search Bar */}
            <div
              className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
                searchBarOpen
                  ? "opacity-100 top-[100%] visible"
                  : "opacity-0 -top-full invisible"
              }`}
              style={{ zIndex: 1000 }}>
              <div className="p-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search blogs..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
                {showDropdown && (
                  <ul
                    ref={dropdownRef}
                    className="suggestion-item absolute bg-white border rounded-lg mt-2 w-full z-10">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {suggestion.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ScrollButtons />
    </>
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
