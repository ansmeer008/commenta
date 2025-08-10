"use client";

import { useModalStore } from "@/store/simpleModal";

export function useSimpleModal() {
  const { openModal, closeModal } = useModalStore();

  return {
    open: openModal,
    close: closeModal,
  };
}
