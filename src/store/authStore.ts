import { create } from "zustand";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: user => set({ user }),
  setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isLoggedIn: false });
      console.log("로그아웃 성공");
      return true;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      return false;
    }
  },
}));
