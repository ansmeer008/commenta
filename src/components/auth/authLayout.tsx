"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const setUser = useAuthStore(state => state.setUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (pathname === "/" || pathname === "/login" || pathname === "signup") return;

      if (user) {
        setIsLoggedIn(true);
        setUser(user);
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
