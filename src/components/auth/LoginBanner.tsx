"use client";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";

export const LoginBanner = () => {
  const { isLoggedIn } = useAuthStore();
  const { openRouteModal } = useRouteModal();

  if (isLoggedIn) return null;
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full py-4">
      <Button type="button" className="w-3/6" onClick={() => openRouteModal("/login")}>
        로그인
      </Button>
    </div>
  );
};
