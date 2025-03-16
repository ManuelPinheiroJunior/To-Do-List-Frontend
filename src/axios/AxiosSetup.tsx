import axios from "axios";
import { store } from "../store/store";


const custom_axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
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