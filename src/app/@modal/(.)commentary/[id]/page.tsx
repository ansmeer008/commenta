"use client";

import { CommentaryDetail } from "@/components/commentary/CommentaryDetail";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function CommentaryDetailModal(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const { isOpen, modalId, closeWithRouterBack } = useRouteModal();
  const pathName = usePathname();

  return (
    <Dialog open={isOpen && pathName === modalId} onOpenChange={closeWithRouterBack}>
      <DialogContent className="!bg-white !shadow-lg !rounded-md !w-[90%] !max-w-sm !p-6 !fixed left-1/2 top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-50">
        <DialogHeader>
          <DialogTitle>코멘터리 상세 페이지 모달</DialogTitle>
        </DialogHeader>
        <CommentaryDetail id={id} isModal={true} />
      </DialogContent>
    </Dialog>
  );
}
