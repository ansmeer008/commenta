"use client";
import { useModalStore } from "@/store/simpleModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function SimpleModalRenderer() {
  const {
    title,
    type,
    message,
    closeModal,
    customContent,
    buttonList,
    closeOnOutsideClick = true,
  } = useModalStore();
  const close = useModalStore.getState().closeModal;
  const isOpen = type !== null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && closeModal()}>
      <DialogContent
        showCloseButton={false}
        className="!bg-white !shadow-lg !rounded-md !w-full !max-w-sm !p-6 !fixed left-1/2 top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-50"
        onPointerDownOutside={e => {
          if (!closeOnOutsideClick) {
            e.preventDefault(); // 바깥 클릭 무시
          }
        }}
      >
        {title ? (
          <DialogTitle className="text-center">{title}</DialogTitle>
        ) : (
          <VisuallyHidden>
            <DialogTitle>Modal</DialogTitle>
          </VisuallyHidden>
        )}

        {message && <p className="text-sm text-center">{message}</p>}
        {customContent}

        {buttonList?.length > 0 && (
          <DialogFooter className="gap-2">
            {buttonList.map(button => (
              <Button
                type="button"
                className="flex-1"
                key={button.text}
                variant={button.variation}
                onClick={e => {
                  e.stopPropagation();
                  button.onClick(close);
                }}
              >
                {button.text}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
