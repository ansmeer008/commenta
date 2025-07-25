"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginModal() {
  //TODO:: routerModalStore 따로 만들기 ?
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        router.back();
        setIsOpen(!isOpen);
      }}
    >
      <DialogContent className="!bg-white !shadow-lg !rounded-md !w-full !max-w-sm !p-6 !fixed left-1/2 top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-50">
        <DialogHeader>
          <DialogTitle>로그인 모달</DialogTitle>
        </DialogHeader>
        로그인 모달
      </DialogContent>
    </Dialog>
  );
}
