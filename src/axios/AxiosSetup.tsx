import axios from "axios";
import { store } from "../store/store";
import { URL_BASE } from "../utils/urls";



const custom_axios = axios.create({
  baseURL: URL_BASE, 
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
