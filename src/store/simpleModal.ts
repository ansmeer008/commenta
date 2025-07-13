import { create } from "zustand";

type ModalType = "confirm" | "alert" | null;

interface ModalButton {
  text: string;
  onClick: (close: () => void) => void;
}

interface ModalState {
  type: ModalType;
  message: string;
  openModal: (config: Omit<ModalState, "openModal" | "closeModal">) => void;
  closeModal: () => void;
  buttonList: ModalButton[];
  closeOnOutsideClick?: boolean;
}

const initialState = {
  type: null,
  message: "",
  buttonList: [],
  closeOnOutsideClick: true,
};

export const useModalStore = create<ModalState>(set => ({
  ...initialState,
  openModal: config => set({ ...config }),
  closeModal: () => set(initialState),
}));
