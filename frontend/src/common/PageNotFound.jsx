import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
      <h1 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
