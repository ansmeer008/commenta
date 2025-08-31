"use client";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const SendDevMailBtn = ({ className }: { className?: string }) => {
  const openSendMail = () => {
    window.location.href =
      "mailto:ansmeer008@gmail.com?subject=[Commenta]문의드립니다&body=문의 내용을 입력하세요.";
  };

  return (
    <div className={className}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            round="full"
            variant="default"
            onClick={openSendMail}
            className="p-4 h-auto"
          >
            <Mail width={24} height={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>개발자에게 메일 보내기</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
