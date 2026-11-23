import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  if (response.data?.data) {
    response.data = response.data.data;
  }

  return response;
});

export default api;