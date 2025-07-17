import { CommentaryItem } from "./CommentaryItem";

interface Commentary {
  id: string;
  imgUrl?: string;
  title: string;
  content: string;
  author: string;
}

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
