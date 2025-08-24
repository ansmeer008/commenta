"use client";
import { useForm } from "@/hooks/useForm";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CategorySearch } from "../category/CategorySearch";
import { Badge } from "../ui/badge";
import { Commentary, createCommentary, editCommentary } from "@/apis/commentary";
import { Category } from "@/apis/category";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { NumberInput } from "../ui/numberInput";
import { getCommentary } from "@/apis/commentary";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoadingStore } from "@/store/loadingStore";

interface CommentaryFormState {
  content: string;
  category: Pick<Category, "title" | "id"> | null;
  isSpoiler: boolean;
  episode: number | null;
}

export const WriteCommentaryForm = ({ close }: { close: () => void }) => {
  const params = useParams();
  const commentaryId = params?.id as string;

  const { startLoading, stopLoading } = useLoadingStore();
  const { user } = useAuthStore();
  const [errorCaption, setErrorCaption] = useState<string | null>(null);
  const { values, setFieldValue } = useForm<CommentaryFormState>({
    content: "",
    category: null,
    isSpoiler: false,
    episode: null,
  });

  const queryClient = useQueryClient();
  const { mutateAsync: mutateCommentary, isPending } = useMutation({
    mutationFn: async (payload: Omit<Commentary, "id" | "createdAt" | "updatedAt">) => {
      if (commentaryId) {
        // 수정
        return await editCommentary({ id: commentaryId, ...payload });
      } else {
        // 등록
        return await createCommentary(payload);
      }
    },
    onMutate: () => startLoading(),
    onSettled: () => stopLoading(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentaryList"] });
      toast(commentaryId ? "코멘터리가 수정되었습니다!" : "코멘터리가 등록되었습니다!");
      close();
    },
    onError: () => {
      toast(commentaryId ? "코멘터리 수정에 실패했습니다." : "코멘터리 등록에 실패했습니다.");
    },
  });

  const checkValidationMsg = (values: CommentaryFormState) => {
    if (!values.category) return "작품을 지정해주세요";
    if (typeof values.episode !== "number" && !values.episode) return "작품의 회차를 지정해주세요";

    return null;
  };

  const handleSubmit = async () => {
    const validationMsg = checkValidationMsg(values);

    if (validationMsg) {
      setErrorCaption(validationMsg);
      return;
    } else {
      setErrorCaption(null);
    }

    if (!user) {
      toast("유저 정보가 존재하지 않습니다.");
      return;
    }

    await mutateCommentary({
      authorId: user.uid,
      authorNickName: user.nickname,
      categoryId: values.category!.id,
      categoryTitle: values.category!.title,
      content: values.content,
      episode: values.episode!,
      isSpoiler: values.isSpoiler,
    });
  };

  useEffect(() => {
    if (!commentaryId) return;

    const initCommentaryData = async (id: string) => {
      const commentaryData = await getCommentary(id);
      if (commentaryData) {
        setFieldValue("content", commentaryData.content);
        setFieldValue("category", {
          id: commentaryData.categoryId,
          title: commentaryData.categoryTitle,
        });
        setFieldValue("isSpoiler", commentaryData.isSpoiler ?? false);
        setFieldValue("episode", commentaryData.episode ?? 0);
      }
    };

    initCommentaryData(commentaryId);
  }, [commentaryId]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold">선택된 작품</p>
        <div className="flex flex-wrap gap-2">
          {values.category ? (
            <Badge>
              {values.category.title}
              <button
                onClick={() => {
                  setFieldValue("category", null);
                }}
              >
                x
              </button>
            </Badge>
          ) : (
            <span className="text-xs text-gray-400">아래에서 작품을 선택해주세요</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold">작품 찾기</p>
        <CategorySearch
          selectHandler={category => {
            setFieldValue("category", category);
          }}
          selectBtnText="선택하기"
        />
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Textarea
          className="resize-none h-30"
          placeholder="오늘 본 인상적인 내용을 공유해보세요!"
          maxLength={100}
          onChange={e => {
            setFieldValue("content", e.target.value);
          }}
          name="content"
          value={values.content}
        />
        <span className="text-left text-xs text-gray-400">{values.content?.length || 0}/100</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold">작품 회차 등록</p>
        <NumberInput
          value={values.episode || 0}
          onChange={value => {
            setFieldValue("episode", value);
          }}
          min={0}
          max={99999}
          step={1}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <Checkbox
            id="spoiler"
            onChange={() => {
              setFieldValue("isSpoiler", !values.isSpoiler);
            }}
          />
          <Label htmlFor="spoiler">스포일러 표기</Label>
        </div>
        <span className="text-xs">스포일러 안내 문구를 표시할 수 있습니다</span>
      </div>
      {errorCaption && <p className="text-xs font-bold text-red-500 my-2">{errorCaption}</p>}
      <Button size="lg" onClick={handleSubmit} disabled={isPending}>
        코멘터리 등록하기
      </Button>
    </div>
  );
};
