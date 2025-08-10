"use client";
import React from "react";
import { create } from "zustand";

type ModalType = "confirm" | "alert" | null;

interface ModalButton {
  text: string;
  onClick: (close: () => void) => void;
}

interface ModalState {
  type: ModalType;
  message: string | null;
  openModal: (config: Omit<ModalState, "openModal" | "closeModal">) => void;
  closeModal: () => void;
  customContent: React.ReactNode | null;
  buttonList: ModalButton[];
  closeOnOutsideClick?: boolean;
}

const initialState = {
  type: null,
  message: null,
  customContent: null,
  buttonList: [],
  closeOnOutsideClick: true,
};

export const useModalStore = create<ModalState>(set => ({
  ...initialState,
  openModal: config => set({ ...config }),
  closeModal: () => set(initialState),
}));
