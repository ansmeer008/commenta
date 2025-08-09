"use client";

import { CommentaryList } from "@/components/commentary/CommentaryList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/authStore";
import { EllipsisVertical, Flame, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isNoSpoilerMode, setIsNoSpoilerMode] = useState(true);

  //TODO:: 추후 user API를 통해 상세 유저 정보를 가져오도록 한다

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
        {/* TODO:: 프로필 영역 */}
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="font-bold text-lg">zerobase1zzanghao</span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
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
                checked={isNoSpoilerMode}
                onCheckedChange={checked => {
                  setIsNoSpoilerMode(checked);
                }}
              />
            </div>
            <p className="text-xs text-gray-300">지정한 회차 이상의 코멘터리는 노출되지 않습니다</p>
          </div>
          <div className="flex flex-col gap-2 border-1 rounded-lg p-4 flex-1">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold">나의 구독</span>
                <Button type="button" variant="ghost">
                  <EllipsisVertical size={20} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                언급이 많은 작품에는 활활 타오르는 표시가 붙어요
              </p>
            </div>
            {/* TODO:: 알록달록..? */}
            <div className="flex flex-wrap gap-2">
              <Badge size="lg">
                <Flame size={14} color="red" fill="red" />
                데못죽(백덕수)
              </Badge>
              <Badge size="lg">
                <Flame size={14} color="red" fill="red" />
                괴담출근(백덕수)
              </Badge>
              <Badge size="lg">어두운바다의등불이되어(연산호)</Badge>
              <Badge size="lg">
                <Plus size={10} />
                10
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg p-4">
          <p className="text-lg font-bold">내가 쓴 코멘터리</p>
          <CommentaryList commentaryList={mockList} isAuthor={true} />
        </div>
        {/* TODO:: 태그 관리하기, 내가 쓴 글 확인 , 로그아웃 등 기능 위치하는 곳 */}
        {/* 구독하는 작품의 화 수 입력하기 */}
        {/* 코멘터리를 자주 쓴 작품 */}
      </main>
    </div>
  );
}
