"use client";
import { useState } from "react";
import { CommentaryImage } from "./CommentaryImage";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const CommentaryItem = ({
  imgUrl,
  title,
  content,
  author,
  className,
}: {
  imgUrl?: string;
  title: string;
  content: string;
  author: string;
  className: string;
}) => {
  const [showPreview, setShowPreview] = useState();

  const preview = content.length > 30 ? `${content.slice(0, 30)}...` : content;

  return (
    <div className={`flex justify-between py-8 ${className}`}>
      <div className="flex-col flex-1">
        <div>
          <Avatar className="flex-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{author}</p>
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
