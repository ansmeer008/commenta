"use client";

import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouteModal } from "@/hooks/useRouteModal";
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const { isOpen, modalId, close, closeWithRouterBack } = useRouteModal();
  const pathname = usePathname();

  return (
    <Dialog open={isOpen && modalId === pathname}>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="bg-white shadow-lg rounded-md w-[80%] max-w-lg min-w-[16rem] p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <DialogHeader className="flex-row justify-between items-center">
            <DialogTitle>로그인</DialogTitle>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={closeWithRouterBack}>
                X
              </Button>
            </DialogClose>
          </DialogHeader>
          <LoginForm close={close} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
