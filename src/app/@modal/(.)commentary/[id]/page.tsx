"use client";

import { CommentaryDetail } from "@/components/commentary/CommentaryDetail";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";
import { use } from "react";

export default function CommentaryDetailModal(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const { isOpen, modalId, closeWithRouterBack } = useRouteModal();
  const pathName = usePathname();

  return (
    <Dialog open={isOpen && pathName === modalId} onOpenChange={closeWithRouterBack}>
      <DialogContent
        className="!bg-white !shadow-2xl !rounded-md !w-[90%] !max-w-lg !p-6 !fixed left-1/2 top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-50"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <CommentaryDetail id={id} isModal={true} close={closeWithRouterBack} />
      </DialogContent>
    </Dialog>
  );
}
