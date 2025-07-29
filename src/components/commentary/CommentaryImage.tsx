"use client";

export const CommentaryImage = ({ imgUrl, className }: { imgUrl?: string; className?: string }) => {
  const url = imgUrl?.length ? imgUrl : "/assets/img/example.jpg";

  return <img src={url} className={`w-1 h-1 ${className}`} />;
};
