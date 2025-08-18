import { create } from "zustand";

interface RouteModalState {
  modalId: string;
  isOpen: boolean;
  open: (modalId: string) => void;
  close: () => void;
}

export const useRouteModalStore = create<RouteModalState>(set => ({
  modalId: "",
  isOpen: false,
  open: (modalId: string) => set({ isOpen: true, modalId }),
  close: () => set({ isOpen: false }),
}));
