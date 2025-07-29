"use client";

import { CommentaryItem } from "./CommentaryItem";

interface Commentary {
  id: string;
  imgUrl?: string;
  title: string;
  content: string;
  author: string;
  genre: string[]; //중복 등록 가능하게 해두는 게 나을지도..
  isSpoiler?: boolean;
}

//TODO:: 실시간 인기 장르 (갑자기 글 마니 올라오는 장르)

export const CommentaryList = ({ commentaryList }: { commentaryList: Commentary[] }) => {
  return (
    <div className="">
      {commentaryList.map((commentary, index) => (
        <CommentaryItem
          key={commentary.id}
          {...commentary}
          className={`${index < commentaryList.length - 1 ? "border-b border-gray-300" : ""}`}
        />
      ))}
    </div>
  );
};
