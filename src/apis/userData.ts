import { UserData, useAuthStore } from "@/store/authStore";
import axios from "axios";

// 유저 데이터 조회
export const fetchUserData = async (uid: string): Promise<UserData | null> => {
  const setUser = useAuthStore.getState().setUser;

  try {
    const res = await axios.get(`/api/users/${uid}`);

    if (res.status !== 200 || !res.data) {
      console.warn(`User ${uid} not found`);
      return null;
    }

    setUser(res.data as UserData);
    return res.data as UserData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
