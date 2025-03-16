import axios from "axios";
import { store } from "../store/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://to-do-list-back-end-one.vercel.app";

console.log("🚀 API Base URL:", API_BASE_URL); 

const custom_axios = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

custom_axios.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    let token = state.auth.token || localStorage.getItem("token");

    if (!token) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default custom_axios;
