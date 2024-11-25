import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

const usePostsByCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const categoryNameFromParams = searchParams.get("categoryName");
  const categoryTypeFromParams = searchParams.get("categoryType");

  useEffect(() => {
    if (categoryNameFromParams && categoryTypeFromParams) {
      setCategoryName(decodeURIComponent(categoryNameFromParams));
      setCategoryType(decodeURIComponent(categoryTypeFromParams));
    }
  }, [categoryNameFromParams,categoryTypeFromParams]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categoryData?categoryId=${categoryId}`);
        setPosts(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchPosts();
    }
  }, [categoryId]);

  return { posts, loading, error, categoryName,categoryType };
};

export default usePostsByCategory;
