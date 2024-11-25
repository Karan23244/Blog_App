import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Authslice"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For fetching data (if needed)

function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]); // State for storing categories
  const navigate = useNavigate();
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call onSearch passed from UserHome
  };
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:py-1 lg:px-3 py-2.5 border border-b-1">
        <div className="flex">
          <div className="flex flex-row items-center space-x-4 w-2/6">
            <Link to="/">
              <img src="/logo.png" alt="Logo" width={200} height={100} />
            </Link>

            {/* Horizontal Divider */}
            <div className="w-[3px] h-16 bg-black"></div>

            <h1 className="text-xl font-bold text-center">
              Inspiring Spaces for Life
            </h1>
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
            }  items-center w-full lg:flex justify-end lg:w-4/6 lg:order-1`}
            id="mobile-menu-2">
            <ul className="flex flex-col items-center gap-5 text-black font-medium lg:flex-row">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/admin/category"
                      className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-red-600 font-bold">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/authors"
                      className="block py-2 pr-4 pl-3 text-black lg:py-1 lg:px-4 hover:text-red-600 font-bold">
                      Authors
                    </Link>
                  </li>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 font-bold focus:outline-none">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-row justify-center items-center gap-10">
                    <div
                      className={`${
                        isMenuOpen ? "block" : "hidden"
                      } w-full lg:flex lg:items-center lg:justify-between lg:w-auto`}>
                      <ul className="flex flex-col lg:flex-row lg:space-x-8">
                        {Object.keys(groupedCategories).map((type) => (
                          <li className="relative group" key={type}>
                            <button className="block text-black  hover:text-red-600 font-bold">
                              {type}
                            </button>
                            <ul className="absolute hidden group-hover:block p-3 w-[300px] z-10 divide-y-2 bg-white shadow-lg border rounded-lg">
                              {groupedCategories[type].map((category) => (
                                <li key={category.category_id} className="p-3">
                                  <Link
                                    to={`/categoryData?categoryId=${
                                      category.category_id
                                    }&categoryName=${encodeURIComponent(
                                      category.category_name
                                    )}&categoryType=${encodeURIComponent(
                                      category.category_type
                                    )}`}
                                    className="block px-4 py-2  hover:border-l-2 text-black">
                                    {category.category_name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search blogs..."
                        className="border border-gray-300 rounded-lg px-4 py-2 mr-4 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
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

export default Navbar;
