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

export const WriteCommentaryForm = ({ close }: { close: () => void }) => {
  const { values, handleChange, reset } = useForm({
    content: "",
  });
  const { user } = useAuthStore();
  const [category, setCategory] = useState<Category | null>(null);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleSubmit = async () => {
    //TODO:: refactoring states handle, need form validation
    //TODO:: spoiler, episode handle
    if (user && category) {
      const res = await createCommentary({
        authorId: user.uid,
        authorNickName: user.nickname,
        categoryId: category.id,
        content: values.content,
        categoryTitle: category.title,
      });

      if (res) {
        toast("코멘터리가 등록되었습니다!");
        close();
      }
    } else if (!category) {
      toast("작품을 등록해주세요");
    } else if (!user) {
      toast("유저 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-bold">선택된 작품</p>
        <div className="flex flex-wrap gap-2">
          {category ? (
            <Badge>
              {category.title}({category.author})
              <button
                onClick={() => {
                  setCategory(null);
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
      <div className="flex flex-col gap-0.5 ">
        <p className="text-xs font-bold">작품 찾기</p>
        <CategorySearch
          selectHandler={category => {
            setCategory(category);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Textarea
          className="resize-none h-30"
          placeholder="오늘 본 인상적인 내용을 공유해보세요!"
          maxLength={100}
          onChange={handleChange}
          name="content"
          value={values.content}
        />
        <span className="text-left text-xs text-gray-400">{values.content.length}/100</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <Checkbox
            id="spoiler"
            onChange={() => {
              setIsSpoiler(prev => !prev);
            }}
          />
          <Label htmlFor="spoiler">스포일러 표기</Label>
        </div>
        <p className="text-xs">스포일러 안내 문구를 표시할 수 있습니다</p>
      </div>
      <Button size="lg" onClick={handleSubmit}>
        코멘터리 등록하기
      </Button>
    </div>
  );
};
