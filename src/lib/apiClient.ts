import axios from "axios";
import { getAuth } from "firebase/auth";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use(async config => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // Firebase ID Token
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
