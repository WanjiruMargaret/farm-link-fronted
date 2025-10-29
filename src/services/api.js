import axios from "axios";
import { BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
