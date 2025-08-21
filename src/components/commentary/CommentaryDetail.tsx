"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Commentary, getCommentary } from "@/apis/commentary";
import { useEffect, useState } from "react";

export const CommentaryDetail = ({ id, isModal }: { id: string; isModal?: boolean }) => {
  const router = useRouter();
  const [commentaryData, setCommentaryData] = useState<Commentary>({
    id: "",
    content: "",
    authorId: "",
    authorNickName: "",
    categoryTitle: "",
    categoryId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const init = async (commentaryId: string) => {
    const data = await getCommentary(commentaryId);
    if (data) {
      setCommentaryData(data);
    }
  };

  useEffect(() => {
    init(id);
  }, [id]);

  return (
    <div className="flex flex-col gap-8">
      {!isModal && (
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft size={30} />
          </Button>
          <Button type="button" variant="ghost">
            <EllipsisVertical size={30} />
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-2 border-1 rounded-lg p-4">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-bold">{commentaryData.authorNickName}</span>
          <span className="text-xs text-gray-500">3분전</span>
        </div>

        <div>
          <Badge variant="secondary">{commentaryData.categoryTitle}</Badge>
        </div>
        <p>{commentaryData.content}</p>

        {/* TODO:: 댓글 기능 추가 시 사용 */}
        {/* <div className="mt-4">
          <p className="text-xs mb-1 text-gray-400">comment</p>
          <Input />

          <ul className="mt-8 flex flex-col gap-8">
            <li className="px-2">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold">zerobase1zzanghao</span>
                <span className="text-xs text-gray-500">3분전</span>
              </div>
              <p>댓글입니다 푸하항 포하항 </p>
            </li>

            <li className="px-2">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold">zerobase1zzanghao</span>
                <span className="text-xs text-gray-500">3분전</span>
              </div>
              <p>댓글입니다 푸하항 포하항 </p>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};
