import axios from "axios";
import { store } from "../store/store";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const custom_axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



custom_axios.interceptors.request.use(
  (config) => {
    const state = store.getState(); 
    const token = state.auth.token; 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default custom_axios;