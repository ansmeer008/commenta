"use client";
import { useForm } from "@/hooks/useForm";
import { useTags } from "@/hooks/useTags";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { CategorySearch } from "../category/CategorySearch";

export const WriteCommentaryForm = () => {
  const { values, handleChange, reset } = useForm({
    content: "",
  });
  const { tags, addTag, removeTag, resetTags } = useTags([]);
  const [isSpoiler, setIsSpoiler] = useState(false);

  //validation : content는 하나만 가능, 코멘터리 내용은 다섯자 이상이어야 한다

  return (
    <div className="flex flex-col gap-5">
      <CategorySearch
        categoryClickAction={selected => {
          console.log(selected);
        }}
      />
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
      <Button size="lg">코멘터리 등록하기</Button>
    </div>
  );
};
