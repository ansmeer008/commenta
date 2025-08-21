"use client";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";

export const LoginBanner = () => {
  const { isLoggedIn } = useAuthStore();
  const { openRouteModal } = useRouteModal();

  if (isLoggedIn) return null;
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full p-8 border-b-2">
      <h2 className="text-2xl font-bold text-center">
        다양한 사람들과 더 많은 코멘터리를 즐기고 싶다면
      </h2>
      <Button className="w-3/6" onClick={() => openRouteModal("/login")}>
        로그인
      </Button>
    </div>
  );
};
