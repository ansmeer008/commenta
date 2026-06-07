"use client";

import { useQuery } from "@tanstack/react-query";
import { CommentaryList } from "../commentary/CommentaryList";
import { useAuthStore } from "@/store/authStore";
import { getCommentaryList } from "@/apis/commentaries";

export const MyCommentariesSection = () => {
  const { user, logout } = useAuthStore();

  const { data: commentaryList, isFetching } = useQuery({
    queryKey: ["commentaryList", user?.uid],
    queryFn: () => getCommentaryList(undefined, user?.uid, user?.subscribes),
    enabled: !!user?.uid,
  });

  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <p className="text-lg font-bold">내가 쓴 코멘터리</p>
      <CommentaryList commentaryList={commentaryList || []} isLoading={isFetching} />
    </div>
  );
};
