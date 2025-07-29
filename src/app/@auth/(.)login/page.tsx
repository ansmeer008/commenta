"use client";

import LoginForm from "@/components/auth/loginForm";
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

export default function LoginModal() {
  const { isOpen, handleClose } = useRouteModal();

  const closeModal = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="bg-white shadow-lg rounded-md w-full max-w-lg p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <DialogHeader className="flex-row justify-between items-center">
            <DialogTitle>로그인 모달</DialogTitle>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={closeModal}>
                X
              </Button>
            </DialogClose>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
