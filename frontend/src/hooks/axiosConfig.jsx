// axiosConfig.js
import axios from "axios";

axios.defaults.withCredentials = true; // Allow cookies with requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Set base API URL

export default axios;
