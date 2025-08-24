"use client";
import { CommentaryImage } from "./CommentaryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { Commentary } from "@/apis/commentary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSimpleModal } from "@/hooks/useSimpleModal";

export const CommentaryItem = ({
  id,
  imgUrl,
  content,
  authorId,
  authorNickName,
  categoryTitle,

  className,
  isSpoiler,
  isAuthor,
}: Commentary & { className: string; isAuthor: boolean }) => {
  const { openRouteModal } = useRouteModal();
  const { open } = useSimpleModal();

  const preview = content.length > 100 ? `${content.slice(0, 100)}...` : content;

  const openDetailCommentaryModal = () => {
    openRouteModal(`/commentary/${id}`);
  };

  const openEditCommentaryModal = () => {
    openRouteModal(`/commentary/${id}/edit`);
  };

  const openDeleteCommentaryModal = () => {
    open({
      type: "confirm",
      title: "코멘터리 삭제",
      message: "작성하신 코멘터리가 삭제됩니다",
      customContent: null,
      buttonList: [
        {
          text: "취소",
          variation: "secondary",
          onClick: close => {
            console.log("취소 close");
            close();
          },
        },
        {
          text: "삭제",
          variation: "destructive",
          onClick: close => {
            console.log("삭제 close");
            close();
          },
        },
      ],
    });
  };

  return (
    <div className={`flex justify-between py-8 ${className}`} onClick={openDetailCommentaryModal}>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-bold">{authorNickName}</span>
              <span className="text-xs text-gray-500">3분전</span>
            </div>
            {isAuthor && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <EllipsisVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    onClick={e => {
                      e.stopPropagation();
                      openEditCommentaryModal();
                    }}
                  >
                    수정하기
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={e => {
                      e.stopPropagation();
                      openDeleteCommentaryModal();
                    }}
                  >
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div>
            <div className="flex gap-0.5">
              <Badge variant="secondary">{categoryTitle}</Badge>
            </div>
          </div>
        </div>
        <div className="">
          <p>{preview}</p>
        </div>
      </div>
      {imgUrl && <CommentaryImage imgUrl={imgUrl} className="flex-1" />}
    </div>
  );
};
