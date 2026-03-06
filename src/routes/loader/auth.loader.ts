import { redirect } from "react-router";
import { axiosInstance } from "../../api/axios";
import { useAuthStore } from "../../store/authStore";

export const fetchUserData = async () => {
  try {
    const user = useAuthStore.getState().user;
    const accessToken = sessionStorage.getItem("access_token");
    if (!user && accessToken) {
      const { data } = await axiosInstance.get("/auth/me");
      const setUserData = useAuthStore.getState().setUserData;
      setUserData(data);
    }
  } catch (e) {
    console.error(e);
  }
};

export const requireAuth = () => {
  const token = sessionStorage.getItem("access_token");
  if (!token) {
    return redirect("/auth/login");
  }
};

export const redirectIfAuth = () => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    return redirect("/");
  }
};
