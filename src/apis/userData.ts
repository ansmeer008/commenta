import { db } from "@/lib/firebase";
import { UserData, useAuthStore } from "@/store/authStore";
import { getDoc, doc } from "firebase/firestore";

// 유저 데이터 조회
export const fetchUserData = async (uid: string): Promise<UserData | null> => {
  const setUser = useAuthStore.getState().setUser;

  try {
    const userSnap = await getDoc(doc(db, "users", uid));

    if (!userSnap.exists()) {
      console.warn(`User ${uid} not found in Firestore`);
      return null;
    }

    setUser(userSnap.data() as UserData);
    return userSnap.data() as UserData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
