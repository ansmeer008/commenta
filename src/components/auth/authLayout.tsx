"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/" || pathname === "/login") return;

    const token = localStorage.getItem("accessToken");
    const isLoggedIn = !!token;

    setIsLoggedIn(isLoggedIn);

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [pathname, setIsLoggedIn]);

  return <>{children}</>;
}
