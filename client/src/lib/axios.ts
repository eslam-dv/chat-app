import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE == "development"
      ? "http://localhost:5001/api/v1"
      : "/api/v1",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { status, data } = error.response || {};
    return Promise.reject({ status, ...data });
  },
);

export default API;
