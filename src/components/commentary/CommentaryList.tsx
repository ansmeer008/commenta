"use client";

import { Commentary } from "@/apis/commentary";
import { CommentaryItem } from "./CommentaryItem";
import { useAuthStore } from "@/store/authStore";

const ListSkeleton = () => {
  return (
    <div className="animate-pulse-slow space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-300 flex flex-col gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
};

export const CommentaryList = ({
  commentaryList,
  isLoading,
  placeholder,
  isClickable = true,
}: {
  commentaryList: Commentary[];
  isLoading?: boolean;
  placeholder?: string;
  isClickable?: boolean;
}) => {
  const { user } = useAuthStore();

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <div className="">
      {commentaryList.map((commentary, index) => (
        <CommentaryItem
          key={commentary.id}
          isClickable={isClickable}
          isAuthor={user?.uid === commentary.authorId}
          {...commentary}
          className={`${index < commentaryList.length - 1 ? "border-b border-gray-300" : ""} cursor-pointer`}
        />
      ))}
      {!commentaryList.length && (
        <div className="p-10 flex items-center justify-center border-1 rounded-lg">
          <p className="text-md text-gray-500 font-bold">
            {placeholder ?? "아직 작성한 코멘터리가 없어요 🥹"}
          </p>
        </div>
      )}
    </div>
  );
};
