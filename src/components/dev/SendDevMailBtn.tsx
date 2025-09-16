"use client";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouteModal } from "@/hooks/useRouteModal";

export const SendDevMailBtn = ({ className }: { className?: string }) => {
  const { openRouteModal } = useRouteModal();

  const openCreateCommentaryModal = () => {
    openRouteModal("/commentary/create");
  };

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            round="full"
            variant="default"
            onClick={openCreateCommentaryModal}
            className="p-4 h-auto"
          >
            <Pencil width={24} height={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>코멘터리 작성하기</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
