"use client";

import { Commentary } from "@/apis/commentary";
import { CommentaryItem } from "./CommentaryItem";
import { useAuthStore } from "@/store/authStore";

export const CommentaryList = ({ commentaryList }: { commentaryList: Commentary[] }) => {
  const { user } = useAuthStore();

  return (
    <div className="">
      {commentaryList.map((commentary, index) => (
        <CommentaryItem
          key={commentary.id}
          isAuthor={user?.uid === commentary.authorId}
          {...commentary}
          className={`${index < commentaryList.length - 1 ? "border-b border-gray-300" : ""} cursor-pointer`}
        />
      ))}
    </div>
  );
};
