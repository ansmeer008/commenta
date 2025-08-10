"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { fetchUserData } from "@/apis/userData";
import { toast } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const setUser = useAuthStore(state => state.setUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (pathname === "/" || pathname === "/login" || pathname === "signup") return;

      if (user) {
        setIsLoggedIn(true);
        const userData = await fetchUserData(user.uid);
        if (!userData) {
          toast.error("유저 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.");
          setIsLoggedIn(false);
          setUser(null);
          router.push("/login");
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, setIsLoggedIn, setUser, router]);

  return <>{children}</>;
}
