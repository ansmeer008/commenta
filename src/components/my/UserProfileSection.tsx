"use client";

import { useAuthStore } from "@/store/authStore";
import { Profile } from "../ui/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/actions/user";
import { useLoadingStore } from "@/store/loadingStore";
import { toast } from "sonner";

export const UserProfileSection = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const { mutate: mutateProfile } = useMutation({
    mutationFn: async (url: string | null) =>
      await updateUserProfile(user!.uid, { profileUrl: url }),
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: data => {
      if (user) setUser({ ...user, profileUrl: data.profile_url });
      toast.success("프로필이 업데이트되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["commentaryList"] });
    },
    onError: () => {
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });

  return (
    <div className="flex items-center gap-4">
      <Profile profileUrl={user?.profileUrl || null} onFileChange={mutateProfile} />
      <div className="flex flex-col">
        <span className="font-bold text-lg">{user?.nickname}</span>
        <span className="text-base text-gray-500">{user?.email}</span>
      </div>
    </div>
  );
};
