import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPost from './AdminPosts/Post';
import AddNewPost from './New_Post/NewPost';

function Admin() {
  const [showAddPost, setShowAddPost] = useState(false);

  const handleAddNewPostClick = () => {
    setShowAddPost(true); 
  };

  const handleBackClick = () => {
    setShowAddPost(false); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        {showAddPost && (
          <button
            onClick={handleBackClick}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
        )}
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {!showAddPost && (
          <button
            onClick={handleAddNewPostClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Add New Post
          </button>
        )}
      </div>

      <div>
        {showAddPost ? <AddNewPost /> : <AllPost />}
      </div>
    </div>
  );
}

export default Admin;
