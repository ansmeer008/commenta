"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
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

    const handleUnload = () => {
      try {
        signOut(auth).catch(err => console.error("Sign out failed", err));
      } finally {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [pathname]);

  return <>{children}</>;
}
