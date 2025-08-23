"use client";

import { CommentaryList } from "@/components/commentary/CommentaryList";
import { NoSpoilerModeSection } from "@/components/my/NoSpoilerModeSection";
import { SubscibeSection } from "@/components/my/SubscribeSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockList = [
  {
    id: "1",
    imgUrl: "",
    title: "어바등...이게 맞냐",
    content:
      "이렇게 내 가슴을 박박 찢어놓고 완결이 나면 다인거임? 나는 이렇게 일상생활이 불가한 몸이 되어버렸는데도..? 왜 나만 두고 떠나가는 것임 이 완결이라는 건...?",
    author: "trieydk23kls3",
    isSpoiler: false,
    genre: ["어바등", "어두운바다의등불이되어"],
  },
  {
    id: "2",
    imgUrl: "",
    title: "어바등...이게 맞냐",
    content:
      "이렇게 내 가슴을 박박 찢어놓고 완결이 나면 다인거임? 나는 이렇게 일상생활이 불가한 몸이 되어버렸는데도..? 왜 나만 두고 떠나가는 것임 이 완결이라는 건...?",
    author: "trieydk23kls3",
    isSpoiler: false,
    genre: ["어바등", "어두운바다의등불이되어"],
  },
  {
    id: "3",
    imgUrl: "",
    title: "어바등...이게 맞냐",
    content:
      "이렇게 내 가슴을 박박 찢어놓고 완결이 나면 다인거임? 나는 이렇게 일상생활이 불가한 몸이 되어버렸는데도..? 왜 나만 두고 떠나가는 것임 이 완결이라는 건...?",
    author: "trieydk23kls3",
    isSpoiler: false,
    genre: ["어바등", "어두운바다의등불이되어"],
  },
];

export default function MyPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

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
          <Avatar className="size-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-bold text-lg">{user?.nickname}</span>
            <span className="text-base text-gray-500">{user?.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <NoSpoilerModeSection />
          <SubscibeSection subscribeList={mockList} />
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-4">
          <p className="text-lg font-bold">내가 쓴 코멘터리</p>
          <CommentaryList commentaryList={[]} />
        </div>
        {/* TODO:: 태그 관리하기, 내가 쓴 글 확인 , 로그아웃 등 기능 위치하는 곳 */}
        {/* 구독하는 작품의 화 수 입력하기 */}
        {/* 코멘터리를 자주 쓴 작품 */}
      </main>
    </div>
  );
}
