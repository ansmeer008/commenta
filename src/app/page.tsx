"use client";

import { Commentary, getCommentaryList } from "@/apis/commentaries";
import { CommentaryList } from "@/components/commentary/CommentaryList";
import { Button } from "@/components/ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoggedIn } = useAuthStore();
  const { openRouteModal } = useRouteModal();
  const [commentaryList, setCommentaryList] = useState<Commentary[]>([]);

  useEffect(() => {
    async function init() {
      const list = await getCommentaryList();
      if (list?.length) {
        setCommentaryList(list);
      }
    }

    init();
  }, []);

  return (
    <div className="flex flex-col w-full py-6 h-full">
      {!isLoggedIn && (
        <div className="flex flex-col gap-4 justify-center items-center w-full p-8 border-b-2">
          <h2 className="text-2xl font-bold text-center">
            다양한 사람들과 더 많은 코멘터리를 즐기고 싶다면
          </h2>
          <Button className="w-3/6" onClick={() => openRouteModal("/login")}>
            로그인
          </Button>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold pt-4">실시간 코멘터리</h2>
        <CommentaryList commentaryList={commentaryList} />
      </div>
    </div>
  );
}
