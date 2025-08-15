import { create } from "zustand";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

export interface UserData {
  uid: string;
  email: string;
  nickname: string;
  createdAt: Date;
  subscribeCategory: string[];
  isNoSpoilerMode: boolean;
}
interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean | null;
  setUser: (user: UserData | null) => void;
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
      toast("로그아웃 성공");
      return true;
    } catch (error) {
      toast(`로그아웃 실패: ${error}`);
      return false;
    }
  },
}));
