"use client";

import { useRouter } from "next/navigation";
import { useRouteModalStore } from "@/store/routeModal";

export function useRouteModal() {
  const router = useRouter();
  const { isOpen, modalId, open, close } = useRouteModalStore();

  const openRouteModal = (path: string) => {
    console.log(path);
    open(path);
    router.push(path);
  };

  const closeWithRouterBack = () => {
    close();
    router.back();
  };

  return {
    modalId,
    close,
    isOpen,
    openRouteModal,
    closeWithRouterBack,
  };
}
