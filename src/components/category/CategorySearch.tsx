"use client";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface Category {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  usageCount: number;
  subscribeCount: number;
}

export const CategorySearch = ({
  categoryClickAction,
}: {
  categoryClickAction: (category: Category) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const categoryList = [
    {
      id: "a",
      title: "데못죽",
      author: "백덕수",
      createdAt: new Date(),
      usageCount: 13984,
      subscribeCount: 12312,
    },
  ];

  //TODO:: 이미 모달인데 centerModal 하나 더 띄워서 직접 입력의 경우 핸들링?
  const handleCustomContent = () => {};

  return (
    <div>
      <div className="releative w-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">선택된 작품</p>
            {/* 이미 입력된 작품이 있는 경우 작품명(작가명, 출판사) 요렇게 보여주기 */}
            {/* 이러면 작품은 한 개만 등록할 수 있어야 할듯! */}
            <div className="flex flex-wrap gap-2">
              <Badge>
                데뷔못하면죽는병걸림(백덕수)
                <button onClick={() => {}}>x</button>
              </Badge>
            </div>
          </div>
          {/* 검색어 입력 */}
          <div className="flex flex-col gap-0.5 ">
            <p className="text-xs font-bold">작품 찾기</p>
            <Input
              onChange={e => {
                setSearch(e.target.value);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
            />
          </div>
        </div>
        {isOpen && (
          <ul className="absolute bg-amber-50">
            {categoryList.map((item: Category) => {
              return (
                <li>
                  {item.title}({item.author})
                </li>
              );
            })}
            {/* 데이터가 없는 경우 '직접입력하기 버튼' */}
            <li onClick={handleCustomContent}>직접 입력하기</li>
          </ul>
        )}
      </div>
    </div>
  );
};
