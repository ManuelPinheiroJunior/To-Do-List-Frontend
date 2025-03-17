import axios from "axios";

const custom_axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default custom_axios;
