import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let retry = false;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !retry) {
      retry = true;
      try {
        const res = await axiosInstance.post("/auth/refresh");
        if (!res.data.accessToken) throw new Error("Access token is missing");
        retry = false;
        sessionStorage.setItem("access_token", res.data.accessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem("access_token");
        await axiosInstance.post("auth/logout");
        return Promise.reject(refreshError);
      }
    }
  },
);
