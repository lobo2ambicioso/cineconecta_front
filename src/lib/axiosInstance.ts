import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
});

api.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
