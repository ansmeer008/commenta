"use client";

import { CommentaryDetail } from "@/components/commentary/CommentaryDetail";
import { WriteCommentaryForm } from "@/components/commentary/WriteCommentaryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";
import { use } from "react";

//soft navigation 시 보여줄 코멘터리 작성 페이지
export default function CommentaryCreateModal() {
  const { isOpen, handleClose } = useRouteModal();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white shadow-lg rounded-md w-full max-w-xl p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <DialogHeader>
          <DialogTitle>코멘터리 작성하기</DialogTitle>
        </DialogHeader>
        <WriteCommentaryForm />
      </DialogContent>
    </Dialog>
  );
}
