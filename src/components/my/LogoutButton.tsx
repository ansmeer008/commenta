"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/loadingStore";
import { toast } from "sonner";

export const LogoutButton = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoadingStore();

  const handleLogout = async () => {
    try {
      startLoading();
      const success = await logout();
      if (success) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("로그아웃에 실패했습니다.");
    } finally {
      stopLoading();
    }
  };

  return (
    <Button type="button" size="sm" variant="secondary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};
