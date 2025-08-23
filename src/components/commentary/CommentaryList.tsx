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
      {!commentaryList.length && (
        <div className="p-10 flex items-center justify-center border-1 rounded-lg">
          <p className="text-sm text-gray-300 font-bold">아직 작성한 코멘터리가 없어요 🥹</p>
        </div>
      )}
    </div>
  );
};
