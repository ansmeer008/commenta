"use client";

import { CommentaryList } from "@/components/commentary/CommentaryList";
import { NoSpoilerModeSection } from "@/components/my/NoSpoilerModeSection";
import { SubscibeSection } from "@/components/my/SubscribeSection";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getCommentaryList } from "@/apis/commentaries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Profile } from "@/components/ui/profile";
import { updateUserData } from "@/apis/userData";
import { toast } from "sonner";
import { useLoadingStore } from "@/store/loadingStore";

export default function MyPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoadingStore();

  const {
    data: commentaryList,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["commentaryList", user?.uid],
    queryFn: () => getCommentaryList(undefined, user?.uid, user?.subscribes),
    enabled: !!user?.uid,
  });

  const { mutate: updateUserProfile } = useMutation({
    mutationFn: async (url: string | null) => await updateUserData(user!.uid, { profileUrl: url }),
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      toast.success("프로필이 업데이트되었습니다!");
    },
    onError: () => {
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/");
    } else {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">내정보</h1>
        <Button size="sm" variant="secondary" onClick={handleLogout}>
          로그아웃
        </Button>
      </header>

      <main className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Profile profileUrl={user?.profileUrl || null} onFileChange={updateUserProfile} />
          <div className="flex flex-col">
            <span className="font-bold text-lg">{user?.nickname}</span>
            <span className="text-base text-gray-500">{user?.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <NoSpoilerModeSection />
          <SubscibeSection />
        </div>
        <div className="flex flex-col gap-2 rounded-lg">
          <p className="text-lg font-bold">내가 쓴 코멘터리</p>
          <CommentaryList commentaryList={commentaryList || []} isLoading={isFetching} />
        </div>
      </main>
    </div>
  );
}
