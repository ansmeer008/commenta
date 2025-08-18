"use client";

import { Commentary } from "@/apis/commentaries";
import { CommentaryItem } from "./CommentaryItem";

//TODO:: 실시간 인기 장르 (갑자기 글 마니 올라오는 장르)

export const CommentaryList = ({
  commentaryList,
  isAuthor,
}: {
  commentaryList: Commentary[];
  isAuthor?: boolean;
}) => {
  return (
    <div className="">
      {commentaryList.map((commentary, index) => (
        <CommentaryItem
          key={commentary.id}
          isAuthor={isAuthor || false}
          {...commentary}
          className={`${index < commentaryList.length - 1 ? "border-b border-gray-300" : ""} cursor-pointer`}
        />
      ))}
    </div>
  );
};
