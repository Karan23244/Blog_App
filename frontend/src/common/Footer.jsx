import React from "react";
import { useLocation, useNavigate,Link } from "react-router-dom"; // Import Link from react-router-dom

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Refresh the page if the user is already on the home page
      window.location.reload();
    } else {
      // Navigate to the home page
      navigate('/');
    }
  };
  return (
    <footer className="text-white bg-black border-t border-gray-700">
      <div className="w-full max-w-screen-xl mx-auto p-3">
        <div className="sm:flex sm:items-center sm:justify-between flex gap-4 justify-between">
          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleLogoClick}
              className="flex items-center space-x-3 mb-4 cursor-pointer">
              <img src="/footerlogo.png" alt="Logo" width={120} height={120} />
            </div>
            <h1 className="text-xl font-bold text-center">
              Inspiring Spaces for Life
            </h1>
          </div>

          <div className="w-9/12 flex flex-col">
            <div>
              <h1 className="text-lg text-white text-center">
                HomImprovement is part of HomeMedia Group, the new generation of
                digital publishers focused on delivering expert insight and
                inspiration for all your home improvement needs. For more
                information you can visit our corporate site:
                <a href="https://clickorbits.com/" target="_blank">
                  www.ClickOrbits.com{" "}
                </a>
                 
              </h1>
            </div>
            <hr className="my-2 border-gray-500" />
            <div>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 justify-between divide-x-2">
                <li>
                  <Link
                    to="/privacy_policy"
                    className="hover:underline text-lg text-white hover:text-blue-900 mx-4 py-2 font-semibold">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms_and_condition"
                    className="hover:underline text-lg text-white hover:text-[#00008B] mx-4 py-2 font-semibold">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="hover:underline text-lg text-white hover:text-[#00008B] mx-4 py-2 font-semibold">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about_us"
                    className="hover:underline text-lg text-white hover:text-[#00008B] mx-4 py-2 font-semibold">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="my-2 border-gray-500" />
            <div className="text-lg text-white text-center">
              <h1>
                @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL PLAZA,
                SINGAPORE (079903)
              </h1>
            </div>
          </div>
          {/* Footer Links Section */}
        </div>

        {/* Divider Line */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Footer Bottom Section */}
        <div className="sm:text-center">
          <span className="block text-sm text-white">
            © 2024{" "}
            <Link to="/" className="hover:underline text-white">
              Homimprovement
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
