"use client";

import { WriteCommentaryForm } from "@/components/commentary/WriteCommentaryForm";
import { StandaloneWrapper } from "@/components/ui/standaloneWrapper";
import { useRouter } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  return (
    <StandaloneWrapper>
      <p className="text-lg font-bold mb-4">코멘터리 수정</p>
      <WriteCommentaryForm close={() => router.back()} />
    </StandaloneWrapper>
  );
}
