import { useState } from "react";
import { Switch } from "../ui/switch";
import { useAuthStore } from "@/store/authStore";
import { updateUserData } from "@/apis/userData";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useLoadingStore } from "@/store/loadingStore";

export const NoSpoilerModeSection = () => {
  const { user } = useAuthStore();
  const [isNoSpoilerMode, setIsNoSpoilerMode] = useState(user?.isNoSpoilerMode ?? false);
  const { startLoading, stopLoading } = useLoadingStore();

  const { mutate: updateMode, isPending } = useMutation({
    mutationFn: async (mode: boolean) => {
      if (!user) throw new Error("로그인 정보가 없습니다.");
      return updateUserData(user.uid, { isNoSpoilerMode: mode });
    },
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      toast(`스포일러 방지 모드가 ${isNoSpoilerMode ? "켜졌어요" : "꺼졌어요"}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "모드 변경 실패");
      setIsNoSpoilerMode(prev => !prev);
    },
  });

  const handleToggle = (checked: boolean) => {
    setIsNoSpoilerMode(checked);
    updateMode(checked);
  };

  return (
    <div className="flex flex-col border-1 rounded-lg p-4 flex-1">
      <div className="flex justify-between items-center">
        <div className="font-bold">
          <span className="mr-1 font-normal">스포일러 방지 모드</span>
          {isNoSpoilerMode ? (
            <span className="text-green-500">켰어요</span>
          ) : (
            <span className="text-red-600">껐어요</span>
          )}
        </div>
        <Switch
          className="cursor-pointer"
          checked={isNoSpoilerMode}
          onCheckedChange={handleToggle}
          disabled={isPending}
        />
      </div>
      <p className="text-xs text-gray-300">지정한 회차 이상의 코멘터리는 노출되지 않습니다</p>
    </div>
  );
};
