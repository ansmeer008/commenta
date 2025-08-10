"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRouteModalStore } from "@/store/routeModal";

export function useRouteModal() {
  const router = useRouter();
  const { isOpen, open, close } = useRouteModalStore();

  useEffect(() => {
    open();
    return () => close();
  }, []);

  const closeWithRouterBack = () => {
    close();
    router.back();
  };

  return {
    close,
    isOpen,
    closeWithRouterBack,
  };
}
