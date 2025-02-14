import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const formatCategory = (str) => {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const usePostsByCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { param1, param2 } = useParams(); // Get params from URL

  const formattedCategoryType = param1 ? formatCategory(param1) : "";
  const formattedCategoryName = param2 ? formatCategory(param2) : "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category/${param1}/${param2}`
        );
        setPosts(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (param1 && param2) {
      fetchPosts();
    }
  }, [param1, param2]);

  return { posts, loading, error, categoryName: formattedCategoryName, categoryType: formattedCategoryType };
};

export default usePostsByCategory;
