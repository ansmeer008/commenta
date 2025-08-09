"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export const CommentaryDetail = ({ id, isModal }: { id: string; isModal?: boolean }) => {
  const router = useRouter();
  const mockData = {
    id: id,
    imgUrl: "",
    content:
      "내용을 적는 곳입니다용 룰루라랄라라라라라라ㅏ 룰루라랄라라라라라라ㅏ 룰루라랄라라라라라라ㅏ 룰루라랄라라라라라라ㅏ 룰루라랄라라라라라라ㅏ 룰루라랄라라라라라라ㅏ",
    commenter: {
      uesrId: 3,
      nickName: "백덕수",
    },
    category: {
      id: "4",
      title: "괴담출근",
      author: "백덕수",
      usageCount: 34,
      createdAt: new Date(),
      lastUsageDate: new Date(),
    },
    isSpoiler: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="flex flex-col py-4 gap-8">
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
      <div className="flex flex-col gap-2 mx-4 border-1 rounded-lg p-4">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-bold">{mockData.commenter.nickName}</span>
          <span className="text-xs text-gray-500">3분전</span>
        </div>

        <div>
          <Badge variant="secondary">
            {mockData.category.title} ({mockData.category.author})
          </Badge>
        </div>
        <p>{mockData.content}</p>

        <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
};
