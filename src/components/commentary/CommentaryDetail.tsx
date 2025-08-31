"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, EllipsisVertical, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Commentary, getCommentary } from "@/apis/commentary";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { Image } from "../ui/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

export const CommentaryDetail = ({
  id,
  isModal,
  close,
}: {
  id: string;
  isModal?: boolean;
  close?: () => void;
}) => {
  const router = useRouter();

  const {
    data: commentaryData,
    isLoading,
    isError,
  } = useQuery<Commentary | null>({
    queryKey: ["commentary", id],
    queryFn: async () => await getCommentary(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  if (isError || !commentaryData) return <div>Error loading commentary</div>;

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
            <AvatarImage src={commentaryData.authorProfileUrl || undefined} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="font-bold">{commentaryData.authorNickName}</span>
          <span className="text-xs text-gray-500">3분전</span>
          {close && (
            <Button onClick={close} className="absolute right-10" variant="ghost">
              <XIcon />
            </Button>
          )}
        </div>

        <div>
          <Badge variant="secondary">{commentaryData.categoryTitle}</Badge>
        </div>
        <p>{commentaryData.content}</p>

        {commentaryData.imgUrlList && commentaryData.imgUrlList?.length > 0 && (
          <Carousel>
            <CarouselContent>
              {commentaryData.imgUrlList.map(img => (
                <CarouselItem key={img} className="w-full h-[300px] md:h-[400px]">
                  <Card className="w-full h-full p-0">
                    <CardContent className="p-0 w-full h-full">
                      <Image url={img} className="w-full h-full object-cover" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

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
