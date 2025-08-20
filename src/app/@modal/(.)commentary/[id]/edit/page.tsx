"use client";

import { WriteCommentaryForm } from "@/components/commentary/WriteCommentaryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useParams, usePathname } from "next/navigation";

export default function CommentaryEditModal() {
  const { isOpen, modalId, closeWithRouterBack } = useRouteModal();
  const pathName = usePathname();
  const params = useParams();
  const commentaryId = params?.id as string;

  return (
    <Dialog open={isOpen && pathName === modalId} onOpenChange={closeWithRouterBack}>
      <DialogContent className="bg-white shadow-lg rounded-md w-full max-w-xl p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <DialogHeader>
          <DialogTitle>코멘터리 수정하기</DialogTitle>
        </DialogHeader>
        <WriteCommentaryForm close={closeWithRouterBack} commentaryId={commentaryId} />
      </DialogContent>
    </Dialog>
  );
}
