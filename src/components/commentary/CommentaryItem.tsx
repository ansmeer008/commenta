"use client";
import { useState } from "react";
import { CommentaryImage } from "./CommentaryImage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export const CommentaryItem = ({
  id,
  imgUrl,
  title,
  content,
  author,
  className,
  genre,
  isSpoiler,
}: {
  id: string;
  imgUrl?: string;
  title: string;
  content: string;
  author: string;
  className: string;
  genre: string[]; //중복 등록 가능하게 해두는 게 나을지도..
  isSpoiler?: boolean;
}) => {
  const [showPreview, setShowPreview] = useState();
  const router = useRouter();

  const preview = content.length > 30 ? `${content.slice(0, 30)}...` : content;

  const openDetailCommentaryModal = () => {
    router.push(`/commentaries/detail/${id}`);
  };

  return (
    <div className={`flex justify-between py-8 ${className}`} onClick={openDetailCommentaryModal}>
      <div className="flex-col flex-1">
        <div>
          <Avatar className="flex-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <span>{author}</span>
            <div className="flex gap-0.5">
              {genre.map(item => (
                <Badge key={item}>{item}</Badge>
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
