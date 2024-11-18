import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/v1";
export const axiosInstance = axios;
