"use client";

import { getCategoriesByCount } from "@/apis/category";
import { Badge } from "../ui/badge";
import type { Category } from "@/apis/category";
import { Flame, ChevronDown, ChevronUp } from "lucide-react";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { SubscribeModalContent } from "../subscribe/SubscribeModalContent";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";

export const CategoryRecommender = () => {
  const [isOpenUsageSection, setIsOpenUsageSection] = useState(false);
  const [isOpenSubSection, setIsOpenSubSection] = useState(false);
  const { open, close } = useSimpleModal();

  const handleSubscribe = (category: Category) => {
    open({
      type: "confirm",
      message: null,
      customContent: <SubscribeModalContent close={close} category={category} />,
      buttonList: [],
    });
  };

  const { data: usageTop5 = [] } = useQuery<Category[] | null>({
    queryKey: ["categories", "usageTop5"],
    queryFn: () => getCategoriesByCount("usage"),
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  const { data: subscribeTop5 = [] } = useQuery<Category[] | null>({
    queryKey: ["categories", "subscribeTop5"],
    queryFn: () => getCategoriesByCount("subscribe"),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex flex-col justify-center iitems-stretch gap-4">
      {usageTop5 && (
        <div className="flex flex-col flex-1 flex-start rounded-2xl bg-gray-100 p-2">
          <div className="flex justify-between items-center gap-2 text-md font-bold">
            <div className="flex justify-center items-center">
              <Flame color="red" size={24} />
              <span>가장 많이 쓰인 코멘터리 Top 5</span>
            </div>
            <Button variant="ghost" onClick={() => setIsOpenUsageSection(prev => !prev)}>
              {isOpenUsageSection ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </div>
          {isOpenUsageSection && (
            <div className="flex flex-wrap gap-2 mt-2 px-2 pb-4">
              {usageTop5.map(category => (
                <Badge
                  key={category.id}
                  className="cursor-pointer"
                  variant="default"
                  size="lg"
                  onClick={() => handleSubscribe(category)}
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      {subscribeTop5 && (
        <div className="flex flex-col flex-1 flex-start rounded-2xl bg-gray-100 p-2">
          <div className="flex justify-between items-center gap-2  text-md font-bold">
            <div className="flex justify-center items-center">
              <Flame color="red" size={24} />
              <span> 가장 많이 구독한 코멘터리 Top 5</span>
            </div>
            <Button variant="ghost" onClick={() => setIsOpenSubSection(prev => !prev)}>
              {isOpenUsageSection ? <ChevronDown /> : <ChevronUp />}
            </Button>
          </div>
          {isOpenSubSection && (
            <div className="flex flex-wrap gap-2 mt-2 px-2 pb-4">
              {subscribeTop5.map(category => (
                <Badge
                  key={category.id}
                  className="cursor-pointer"
                  variant="default"
                  size="lg"
                  onClick={() => handleSubscribe(category)}
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
