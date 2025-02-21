import { useParams } from "react-router-dom";
import CategoryBlogs from "./Components/User/CategoryBlogs";
import FullPostAdmin from "./Components/Admin/AdminPosts/FullPosts";

const predefinedCategoriesType = ["upgrade-yourself", "home-insights"];

const RouteHandler = () => {
  const { param1 } = useParams();
  // If categoryType is in predefined categories, render CategoryBlogs
  if (predefinedCategoriesType.includes(param1)) {
    return <CategoryBlogs />;
  } 
  // Otherwise, render FullPostAdmin
  else {
    return <FullPostAdmin />;
  }
};

export default RouteHandler;
