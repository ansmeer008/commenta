"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { auth } from "@/lib/firebase";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from "firebase/auth";
import { usePathname } from "next/navigation";
import { fetchUserData } from "@/apis/userData";
import { toast } from "sonner";
import { useRouteModal } from "@/hooks/useRouteModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const setUser = useAuthStore(state => state.setUser);
  const pathname = usePathname();
  const { openRouteModal } = useRouteModal();
  const publicPath = ["/", "/login", "/signup"];

  useEffect(() => {
    // 세션 Persistence 설정 (브라우저 종료 시 로그아웃, 새로고침 시 유지)
    setPersistence(auth, browserSessionPersistence).catch(err => {
      console.error("Firebase persistence error:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setIsLoggedIn(true);
        const userData = await fetchUserData(user.uid);
        if (userData) {
          setUser(userData);
        } else {
          toast.error("유저 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.");
          setIsLoggedIn(false);
          setUser(null);
          openRouteModal("/login");
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        if (!publicPath.includes(pathname)) {
          openRouteModal("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  return <>{children}</>;
}
