"use client";
import { Image } from "../ui/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { EllipsisVertical, User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouteModal } from "@/hooks/useRouteModal";
import { Commentary, deleteCommentary } from "@/apis/commentary";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoadingStore } from "@/store/loadingStore";

export const CommentaryItem = ({
  id,
  imgUrlList,
  content,
  authorId,
  authorNickName,
  authorProfileUrl,
  categoryTitle,

  className,
  isSpoiler,
  isAuthor,
}: Commentary & { className: string; isAuthor: boolean }) => {
  const queryClient = useQueryClient();
  const { openRouteModal } = useRouteModal();
  const { open } = useSimpleModal();
  const { startLoading, stopLoading } = useLoadingStore();

  const deleteMutation = useMutation({
    mutationFn: (commentaryId: string) => deleteCommentary(commentaryId),
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      // 삭제 성공하면 commentaryList query를 무효화
      queryClient.invalidateQueries({ queryKey: ["commentaryList"] });
    },
  });

  const preview = content.length > 100 ? `${content.slice(0, 100)}...` : content;

  const openDetailCommentaryModal = () => {
    openRouteModal(`/commentary/${id}`);
  };

  const openEditCommentaryModal = () => {
    openRouteModal(`/commentary/${id}/edit`);
  };

  const openDeleteCommentaryModal = () => {
    open({
      type: "confirm",
      title: "코멘터리 삭제",
      message: "작성하신 코멘터리가 삭제됩니다",
      customContent: null,
      buttonList: [
        {
          text: "취소",
          variation: "secondary",
          onClick: close => {
            close();
          },
        },
        {
          text: "삭제",
          variation: "destructive",
          onClick: async close => {
            await deleteMutation.mutateAsync(id);
            close();
          },
        },
      ],
    });
  };

  return (
    <div className={`flex justify-between py-8 ${className}`} onClick={openDetailCommentaryModal}>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={authorProfileUrl ?? undefined} alt="Profile" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="font-bold">{authorNickName}</span>
              <span className="text-xs text-gray-500">3분전</span>
            </div>
            {isAuthor && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <EllipsisVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    onClick={e => {
                      e.stopPropagation();
                      openEditCommentaryModal();
                    }}
                  >
                    수정하기
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={e => {
                      e.stopPropagation();
                      openDeleteCommentaryModal();
                    }}
                  >
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div>
            <div className="flex gap-0.5">
              <Badge variant="secondary">{categoryTitle}</Badge>
            </div>
          </div>
        </div>
        <div className="">
          <p>{preview}</p>
        </div>
        {imgUrlList && imgUrlList?.length > 0 && (
          <div className="flex gap-2">
            {imgUrlList.map(img => {
              return <Image key={img} url={img} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
