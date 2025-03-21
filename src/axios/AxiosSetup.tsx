import axios from "axios";
import { store } from "../store/store";
import { URL_BASE } from "../utils/urls";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || URL_BASE;

const custom_axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

custom_axios.interceptors.request.use(
  async (config) => {
    let state = store.getState();
    let token = state.auth.token || localStorage.getItem("token");


    let attempts = 0;
    while (!token && attempts < 6) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      state = store.getState();
      token = state.auth.token || localStorage.getItem("token");
      attempts++;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("🚨 Nenhum token encontrado após aguardar!");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default custom_axios;
