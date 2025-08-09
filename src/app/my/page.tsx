"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold">내정보</h1>
      </header>

      <main>
        {/* TODO:: 프로필 영역 */}
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>email: {user?.email}</p>
        </div>
        {/* TODO:: 태그 관리하기, 내가 쓴 글 확인 , 로그아웃 등 기능 위치하는 곳 */}
        {/* 구독하는 작품의 화 수 입력하기 */}
        {/* 스포일러 관련 처리 - 필터링 할 지, 스포 표기만 해서 노출되도록 할 건지 */}
        <p>TODO:: 내가 구독하고 있는 작품/작가 관리하기</p>
        {/* 코멘터리를 자주 쓴 작품 */}
        <Button size="lg" onClick={handleLogout}>
          로그아웃
        </Button>
      </main>
    </div>
  );
}
