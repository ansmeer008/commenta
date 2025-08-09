"use client";
import { useState } from "react";
import { CommentaryImage } from "./CommentaryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

export const CommentaryItem = ({
  id,
  imgUrl,
  title,
  content,
  author,
  className,
  genre,
  isSpoiler,
  isAuthor,
}: {
  id: string;
  imgUrl?: string;
  title: string;
  content: string;
  author: string;
  className: string;
  genre: string[]; //중복 등록 가능하게 해두는 게 나을지도..
  isSpoiler?: boolean;
  isAuthor?: boolean;
}) => {
  const [showPreview, setShowPreview] = useState();
  const router = useRouter();

  const preview = content.length > 30 ? `${content.slice(0, 30)}...` : content;

  const openDetailCommentaryModal = () => {
    router.push(`/commentaries/detail/${id}`);
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
              <span className="font-bold">{author}</span>
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
              {genre.map(item => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <p>{title}</p>
          <p>{preview}</p>
        </div>
      </div>
      {imgUrl && <CommentaryImage imgUrl={imgUrl} className="flex-1" />}
    </div>
  );
};
