"use client";
import { useLoadingStore } from "@/store/loadingStore";
import { Spinner } from "./spinner";

export const GlobalLoading = () => {
  const count = useLoadingStore(state => state.count);
  return count > 0 ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Spinner />
    </div>
  ) : null;
};
