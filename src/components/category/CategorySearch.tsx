"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { ListPlus } from "lucide-react";
import { Button } from "../ui/button";

interface Category {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  usageCount: number;
  subscribeCount: number;
}

export const CategorySearch = ({ className }: { className?: string }) => {
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
    <div className={className}>
      <div className="relative w-full">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="원하는 작품을 찾아보세요"
            onChange={e => {
              setSearch(e.target.value);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
        </div>
        {isOpen && (
          <ul className="absolute bg-gray-100 z-10 left-0 right-0 rounded-b-md shadow-2xs">
            {categoryList.map((item: Category) => {
              return (
                <li key={item.id} className="p-2 flex justify-between">
                  <div>
                    <p>
                      {item.title}({item.author})
                    </p>
                    <p className="text-xs text-gray-500">
                      언급 {item.usageCount}회, 구독 {item.subscribeCount}회
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={e => {
                        e.stopPropagation();
                        console.log("click");
                      }}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <span className="text-xs text-gray-700">구독하기</span>
                      <ListPlus size={20} />
                    </Button>
                  </div>
                </li>
              );
            })}
            {/* 데이터가 없는 경우 '직접입력하기 버튼' */}
            <li className="p-2" onClick={handleCustomContent}>
              직접 입력하기
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
