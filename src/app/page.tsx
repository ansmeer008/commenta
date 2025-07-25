"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex-col w-full">
      <p>홈 입니다</p>
      <Button onClick={() => router.push("/login")}>로그인</Button>
    </div>
  );
}
