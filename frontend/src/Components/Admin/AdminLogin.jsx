import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/Authslice';

const LoginPage = () => {
  // State variables for form fields and validation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect to admin home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/home');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/adminlogin`, { username, password }, 
      );

      if (response.data.role === 'admin') {
        dispatch(login(response.data.user)); // Dispatch login action
        navigate('/admin/home');
      } else {
        setError('Unauthorized access. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Login</h2>

        {/* Error message display */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white ${loading ? 'bg-blue-300' : 'bg-blue-500'} 
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        {/* Optional: Add a link to reset password or contact */}
        {/* <div className="text-center mt-4">
          <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
