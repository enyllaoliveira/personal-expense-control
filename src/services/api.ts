import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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
        await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        return api(originalRequest);
      } catch (err) {
        console.error("Falha ao renovar o token", err);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
