import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tag, useTags } from "@/hooks/useTags";

const TagSelect = ({
  children,
  isOpenSelectList,
}: {
  children: React.ReactNode;
  isOpenSelectList: boolean;
}) => {
  const selectAction = (isNewTag?: boolean) => {};

  return (
    <div className="releative w-full">
      {children}
      {isOpenSelectList && (
        <ul className="absolute bg-amber-50">
          <li>검색 후 노출되는 리스트 아이템</li>
          <li>검색 후 노출되는 리스트 아이템</li>
          {/* 데이터가 없는 경우 '직접입력하기 버튼' */}
          <li onClick={() => selectAction(true)}>직접 입력하기</li>
        </ul>
      )}
    </div>
  );
};

export const AddTagsInput = ({ tagList }: { tagList: Tag[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const { addTag, removeTag } = useTags();
  //태그는 최대 다섯개까지 선택 가능

  return (
    <div>
      <TagSelect isOpenSelectList={isOpen}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">선택된 태그</p>
            {/* 이미 입력된 태그가 있는 경우 보여주기 */}
            <div className="flex flex-wrap gap-2">
              {tagList.map(tag => (
                <Badge key={tag.id}>
                  {tag.label}
                  <button onClick={() => removeTag(tag.id)}>x</button>
                </Badge>
              ))}
            </div>
          </div>
          {/* 검색어 입력 */}
          <div className="flex flex-col gap-0.5 ">
            <p className="text-xs font-bold">태그 찾기</p>
            <Input
              onChange={e => {
                setSearchTag(e.target.value);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
            />
          </div>
        </div>
      </TagSelect>
    </div>
  );
};
