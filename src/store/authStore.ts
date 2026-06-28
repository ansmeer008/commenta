import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { signOut as serverSignOut } from "@/actions/auth";
import { toast } from "sonner";

export type Subscribe = { id: string; episode: number | null };

export interface UserData {
  uid: string;
  email: string;
  nickname: string;
  createdAt: Date;
  subscribes: Subscribe[];
  isNoSpoilerMode: boolean;
  profileUrl: string | null;
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
  isLoggedIn: null,
  setUser: user => set({ user }),
  setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
  logout: async () => {
    try {
      // 서버 측 세션 쿠키 삭제
      await serverSignOut();
      // 브라우저 측 세션 상태 초기화
      const supabase = createClient();
      await supabase.auth.signOut();
      set({ user: null, isLoggedIn: false });
      toast("로그아웃 성공");
      return true;
    } catch (error) {
      toast(`로그아웃 실패: ${error}`);
      return false;
    }
  },
}));
