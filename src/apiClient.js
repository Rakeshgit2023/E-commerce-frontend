import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: `${import.meta.env.VITE_API_SERVER_URL}`,
});

export default apiClient;
