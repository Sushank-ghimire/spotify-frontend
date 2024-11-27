import axios from "axios";
axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/v1"
    : "/api/v1";
export const axiosInstance = axios;
