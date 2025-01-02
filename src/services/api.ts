import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, {});

        return api(originalRequest);
      } catch (err) {
        console.error(err);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
