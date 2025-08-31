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
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

const Content = ({
  content,
  isSpoiler,
  imgUrlList,
}: {
  content: string;
  isSpoiler: boolean;
  imgUrlList: string[];
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <div
        className={`whitespace-pre-line transition-all ${
          revealed || !isSpoiler ? "blur-0" : "blur-md select-none"
        }`}
      >
        <p>{content}</p>
        {imgUrlList && imgUrlList?.length > 0 && (
          <div className="flex gap-2 mt-4">
            {imgUrlList.map(img => {
              return <Image key={img} url={img} />;
            })}
          </div>
        )}
      </div>

      {!revealed && isSpoiler && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={e => {
              e.stopPropagation();
              setRevealed(true);
            }}
          >
            스포일러 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export const CommentaryItem = ({
  id,
  imgUrlList,
  content,
  authorId,
  authorNickName,
  authorProfileUrl,
  categoryTitle,
  episode,

  className,
  isSpoiler,
  isAuthor,
  isClickable = true,
}: Commentary & { className: string; isAuthor: boolean; isClickable?: boolean }) => {
  const queryClient = useQueryClient();
  const { openRouteModal } = useRouteModal();
  const { open } = useSimpleModal();
  const { startLoading, stopLoading } = useLoadingStore();
  const { user } = useAuthStore();

  const isSpoilerTarget = user
    ? user?.isNoSpoilerMode && authorId !== user?.uid && isSpoiler
    : isSpoiler;

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
    <div
      className={`flex justify-between py-8 ${className}`}
      onClick={isClickable ? openDetailCommentaryModal : () => {}}
    >
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
            <div className="flex items-center gap-0.5">
              <Badge variant="secondary">{categoryTitle}</Badge>
              {episode && episode > 0 && (
                <span className="text-xs text-red-400 ml-1">{episode}화</span>
              )}
            </div>
          </div>
        </div>
        <Content
          content={preview}
          isSpoiler={isSpoilerTarget || false}
          imgUrlList={imgUrlList || []}
        />
      </div>
    </div>
  );
};
