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
    <div className="bg-[#DEDEFF] text-black py-5">
      <div className="flex flex-col lg:flex-row justify-center mx-auto gap-4 px-8">
        <div className="lg:w-1/2">
          <h2 className="lg:text-3xl text-lg font-semibold text-justify">
            Transform your home subscribe for the latest trends and ideas
          </h2>
        </div>
        <div className="lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="lg:w-1/2 w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="lg:w-2/12 w-full bg-[#00008B] text-white font-semibold px-6 py-2 rounded-md transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>
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
  );
};

export default Subscribe;
