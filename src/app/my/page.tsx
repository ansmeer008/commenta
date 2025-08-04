"use client";

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
        <p>내정보 페이지</p>
        <p>email: {user?.email}</p>
        <Button size="lg" onClick={handleLogout}>
          로그아웃
        </Button>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">© Commenta</footer>
    </div>
  );
}
