"use client";
import { useState } from "react";
import { CommentaryImage } from "./CommentaryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { Commentary } from "@/apis/commentaries";

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

  const preview = content.length > 30 ? `${content.slice(0, 30)}...` : content;

  const openDetailCommentaryModal = () => {
    openRouteModal(`/commentary/${id}`);
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
              <Button variant="ghost">
                <EllipsisVertical size={16} />
              </Button>
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
