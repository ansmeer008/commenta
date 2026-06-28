"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { useRouteModal } from "@/hooks/useRouteModal";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const setUser = useAuthStore(state => state.setUser);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const { openRouteModal } = useRouteModal();
  const publicPath = ["/", "/login", "/signup"];

  // 콜백 안에서 DB 쿼리 시 Supabase 내부 deadlock 발생
  // → 콜백에서는 userId만 저장하고, 별도 effect에서 fetch
  const [sessionUserId, setSessionUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // 1단계: auth 상태 변화 감지 → userId만 저장
  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setSessionUserId(session.user.id);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setSessionUserId(null);
        if (event !== "SIGNED_OUT" && !publicPath.includes(pathnameRef.current)) {
          openRouteModal("/login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2단계: userId 확정 후 DB fetch
  useEffect(() => {
    if (!sessionUserId) return;

    const fetchUserData = async () => {
      const supabase = createClient();

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sessionUserId)
        .single();

      if (profileError || !profile) {
        console.error("AuthLayout: 프로필 조회 실패", profileError?.message);
        setIsLoggedIn(false);
        setUser(null);
        openRouteModal("/login");
        return;
      }

      const { data: subsData } = await supabase
        .from("subscriptions")
        .select("id, episode, work_id")
        .eq("user_id", sessionUserId);

      setUser({
        uid: profile.id,
        email: profile.email,
        nickname: profile.nickname,
        createdAt: new Date(profile.created_at),
        subscribes: (subsData ?? []).map(s => ({ id: s.id, episode: s.episode })),
        isNoSpoilerMode: profile.is_no_spoiler_mode,
        profileUrl: profile.profile_url,
      });
    };

    fetchUserData();
  }, [sessionUserId]);

  return <>{children}</>;
}
