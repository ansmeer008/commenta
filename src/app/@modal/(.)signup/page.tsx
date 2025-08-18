"use client";

import SignUpForm from "@/components/auth/signUpForm";
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
import { useRouter } from "next/navigation";

export default function SignUpModal() {
  const { isOpen, close } = useRouteModal();
  const router = useRouter();

  const closeModal = () => {
    router.replace("/");
    close();
  };

  return (
    <Dialog open={isOpen}>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="bg-white shadow-lg rounded-md w-full max-w-lg p-6 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <DialogHeader className="flex-row justify-between items-center">
            <DialogTitle>회원가입 모달</DialogTitle>
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={closeModal}>
                X
              </Button>
            </DialogClose>
          </DialogHeader>
          <SignUpForm close={closeModal} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
