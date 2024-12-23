import React, { useState, useEffect } from "react";
import axios from "axios"; // Don't forget to import axios if not already

const SubscribePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/subscribe`,
        { email }
      );
      setMessage(response.data.message);
      setStatus("success");
      setEmail(""); // Clear the input field
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setStatus("error");
    }
  };

  useEffect(() => {
    // Show the popup after 5 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setIsVisible(true), 10); // Add a slight delay for animation
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowPopup(false), 300); // Match this duration with animation duration
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full h-[30%] transition-transform duration-300 transform flex flex-col lg:flex-row justify-center items-center mx-auto gap-6 px-8 ${
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}>
            <button
              onClick={handleClose}
              className="absolute top-2 right-6 text-4xl font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
              &times; {/* X close icon */}
            </button>
            <div>
              <img
                src="/headerlogo.webp"
                alt="Logo"
                width={300}
                height={300}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-8 items-start">
              <div>
                <h1>Embark on a journey of transformation!</h1>
              </div>
              <div>
                <h1 className="text-justify">
                  Join us for innovative home solutions that inspire, excite,
                  and redefine your living experience!
                </h1>
              </div>
              <div className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="lg:w-1/2 w-full px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="lg:w-1/2 w-full bg-[#00008B] text-white font-semibold px-6 py-2 rounded-md transition-all duration-300">
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
        </div>
      )}
    </>
  );
};

export default SubscribePopup;
