import { create } from "zustand";

interface LoadingState {
  count: number;
  startLoading: () => void;
  stopLoading: () => void;
  reset: () => void;
}

export const useLoadingStore = create<LoadingState>(set => ({
  count: 0,
  startLoading: () => set(state => ({ count: state.count + 1 })),
  stopLoading: () => set(state => ({ count: Math.max(0, state.count - 1) })),
  reset: () => set({ count: 0 }),
}));
