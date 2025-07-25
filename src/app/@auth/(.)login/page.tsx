"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";

export default function LoginModal() {
  const { isOpen } = useRouteModal();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-white shadow-lg rounded-md w-full max-w-lg p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <DialogHeader>
          <DialogTitle>로그인 모달</DialogTitle>
        </DialogHeader>
        로그인 모달
      </DialogContent>
    </Dialog>
  );
}
