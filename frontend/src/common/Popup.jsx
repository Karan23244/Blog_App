import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscribePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
        { email }
      );
      setMessage(response.data.message);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setStatus("error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setIsVisible(true), 10);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 max-w-sm sm:max-w-md lg:max-w-3xl w-full h-auto transition-transform duration-300 transform flex flex-col lg:flex-row justify-center items-center mx-auto gap-6 px-4 sm:px-8 ${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}>
            <button
              onClick={handleClose}
              className="absolute top-2 right-4 sm:right-6 text-2xl sm:text-4xl font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
              &times;
            </button>
            <div className="w-32 sm:w-48 lg:w-60 flex-shrink-0">
              <img
                src="/headerlogo.webp"
                alt="Logo"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-4 sm:gap-8 items-start text-center sm:text-left">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Embark on a journey of transformation!
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Join us for innovative home solutions that inspire, excite, and
                redefine your living experience!
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#00008B] text-white font-semibold px-6 py-2 rounded-md transition-all duration-300">
                  Subscribe
                </button>
              </form>
              {message && (
                <p
                  className={`mt-4 text-center ${
                    status === "success" ? "text-green-500" : "text-red-500"
                  }`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribePopup;
