"use client";
import { useForm } from "@/hooks/useForm";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { CategorySearch } from "../category/CategorySearch";
import { Badge } from "../ui/badge";
import { createCommentary } from "@/apis/commentaries";
import { Category } from "@/apis/category";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { NumberInput } from "../ui/numberInput";

interface CommentaryFormState {
  content: string;
  category: Category | null;
  isSpoiler: boolean;
  episode: number | null;
}

export const WriteCommentaryForm = ({ close }: { close: () => void }) => {
  const { user } = useAuthStore();
  const [errorCaption, setErrorCaption] = useState<string | null>(null);
  const { values, setFieldValue, reset } = useForm<CommentaryFormState>({
    content: "",
    category: null,
    isSpoiler: false,
    episode: null,
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

    console.log(values);

    if (user) {
      const res = await createCommentary({
        authorId: user.uid,
        authorNickName: user.nickname,
        categoryId: values.category!.id,
        content: values.content,
        categoryTitle: values.category!.title,
        episode: values.episode!,
        isSpoiler: values.isSpoiler,
      });

      if (res) {
        toast("코멘터리가 등록되었습니다!");
        close();
      }
    } else {
      toast("유저 정보가 존재하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold">선택된 작품</p>
        <div className="flex flex-wrap gap-2">
          {values.category ? (
            <Badge>
              {values.category.title}({values.category.author})
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
        <span className="text-left text-xs text-gray-400">{values.content.length}/100</span>
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
      <Button size="lg" onClick={handleSubmit}>
        코멘터리 등록하기
      </Button>
    </div>
  );
};
