import React, { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
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

  return (
    <div className="bg-[#DEDEFF] text-black py-10">
      <div className="max-w-full px-4 flex flex-col lg:flex-row justify-between items-center lg:gap-16 gap-4">
        {/* Left section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed">
            Transform your home—subscribe for the latest trends and ideas
          </h2>
        </div>

        {/* Right section */}
        <div className="lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row lg:items-end lg:justify-end lg:gap-8 gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow lg:max-w-[50%] w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-[#00008B] text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Subscribe
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                status === "success" ? "text-green-500" : "text-red-500"
              }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
